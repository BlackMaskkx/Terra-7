# neural_net.py  
class NeuralNet:  
    def __init__(self):  
        self.weights = [...]  # Pesos aleatorios  

    def forward(self, x):  
        # Lógica de inferencia (como TensorFlow)  
        return prediction  

    def train(self, x, y, epochs=1000):  
        # Backpropagation manual (optimización SGD)  
        for _ in range(epochs):  
            grad = self.calculate_gradient(x, y)  
            self.weights -= learning_rate * grad  
