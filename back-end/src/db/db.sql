CREATE DATABASE corridas;


CREATE TABLE drivers (
    id SERIAL PRIMARY KEY,                     
    name VARCHAR(255) NOT NULL,               
    description TEXT NOT NULL,                
    vehicle VARCHAR(255) NOT NULL, 
    rating NUMERIC(2, 1) NOT NULL, 
    rate NUMERIC(10, 2) NOT NULL,
    minKm NUMERIC(10, 2) NOT NULL 
);

CREATE TABLE rides (
    id SERIAL PRIMARY KEY,                     
    customer_id VARCHAR(255) NOT NULL,         
    origin VARCHAR(255) NOT NULL,              
    destination VARCHAR(255) NOT NULL,         
    distance FLOAT NOT NULL,                   
    duration VARCHAR(100) NOT NULL,            
    driver_id INT NOT NULL,                    
    value FLOAT NOT NULL,                     
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    CONSTRAINT fk_driver FOREIGN KEY (driver_id) REFERENCES drivers (id) 
);

INSERT INTO drivers (name, description, vehicle, rating, rate, minKm) VALUES
('Homer Simpson', 'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).', 'Plymouth Valiant 1973 rosa e enferrujado', 2.0, 2.50, 1),
('Dominic Toretto', 'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.', 'Dodge Charger R/T 1970 modificado', 4.0, 5.00, 5),
('James Bond', 'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.', 'Aston Martin DB5 clássico', 5.0, 10.00, 10);