CREATE DATABASE BibliotecaAcad;

USE BibliotecaAcad;

CREATE TABLE orientadores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL
);

CREATE TABLE trabalhos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  orientador_id INT,
  FOREIGN KEY (orientador_id) REFERENCES orientadores(id)
);

-- Inserir orientadores
INSERT INTO orientadores (nome) VALUES ('Prof. Ana Silva'), ('Dr. João Lima');

-- Inserir trabalhos
INSERT INTO trabalhos (titulo, orientador_id) VALUES
  ('Inteligência Artificial na Educação', 1),
  ('Sistemas Distribuídos Aplicados', 2);
