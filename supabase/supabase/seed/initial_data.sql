-- Insert default property types
INSERT INTO property_types (name, description) VALUES 
  ('Apartamento', 'Unidade residencial em um edifício com várias unidades'),
  ('Casa', 'Prédio residencial independente'),
  ('Comercial', 'Propriedade para fins comerciais'),
  ('Terreno', 'Terreno não desenvolvido'),
  ('Loja', 'Loja comercial'),
  ('Sala Comercial', 'Sala comercial'),
  ('Chácara', 'Chácara'),
  ('Fazenda', 'Fazenda'),
  ('Sítio', 'Sítio'),
  ('Hotel', 'Hotel'),
  ('Pousada', 'Pousada'),
  ('Ponto Comercial', 'Ponto Comercial'),
  ('Outros', 'Outros');

INSERT INTO property_amenities (name) VALUES 
  ('Área de lazer'),
  ('Piscina'),
  ('Churrasqueira'),
  ('Garagem'),
  ('Outros');
