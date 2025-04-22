// tensor.hpp (simulación de PyTorch en C++)  
template<typename T>  
class Tensor {  
public:  
    std::vector<std::vector<T>> data;  

    Tensor dot(Tensor other) {  
        // Multiplicación matricial (¡núcleo de la IA!)  
    }  

    Tensor relu() {  
        // Activación ReLU para redes neuronales  
    }  
};  
