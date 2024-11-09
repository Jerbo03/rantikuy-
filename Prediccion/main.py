import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
from sklearn.preprocessing import LabelEncoder

np.random.seed(42)
num_samples = 500

data = pd.DataFrame({
    'fecha': pd.date_range(start='2024-01-01', periods=num_samples, freq='D'),
    'ubicacion': np.random.choice(['Centro', 'Norte', 'Sur', 'Este', 'Oeste'], num_samples),
    'producto': np.random.choice(['Chips', 'Soda', 'Chocolate', 'Fruit Snacks'], num_samples),
    'proveedor': np.random.choice(['Proveedor A', 'Proveedor B', 'Proveedor C'], num_samples),
    'ventas': np.random.poisson(lam=20, size=num_samples)  # Simulación de ventas diarias
})

print(data.head())

# 1. Preprocesamiento de datos
label_encoder = LabelEncoder()
data['ubicacion'] = label_encoder.fit_transform(data['ubicacion'])
data['producto'] = label_encoder.fit_transform(data['producto'])
data['proveedor'] = label_encoder.fit_transform(data['proveedor'])

# Extraer características adicionales de la fecha
data['dia'] = data['fecha'].dt.day
data['mes'] = data['fecha'].dt.month
data['año'] = data['fecha'].dt.year
data = data.drop('fecha', axis=1)

# 2. Separar características y variable objetivo
X = data.drop('ventas', axis=1)
y = data['ventas']

# 3. Dividir los datos en conjuntos de entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4. Entrenamiento del modelo (Random Forest Regressor)
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 5. Realizar predicciones
y_pred = model.predict(X_test)

# 6. Evaluar el modelo
mae = mean_absolute_error(y_test, y_pred)
print(f"Error Absoluto Medio (MAE): {mae}")

# Ejemplo de predicción
nueva_muestra = pd.DataFrame({
    'ubicacion': [label_encoder.transform(['Centro'])[0]],
    'producto': [label_encoder.transform(['Chips'])[0]],
    'proveedor': [label_encoder.transform(['Proveedor A'])[0]],
    'dia': [15],
    'mes': [10],
    'año': [2024]
})

prediccion_ventas = model.predict(nueva_muestra)
print(f"Predicción de ventas para la muestra: {prediccion_ventas[0]}")
