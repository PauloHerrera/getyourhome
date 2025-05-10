
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

-- Insert default property amenity categories with UUIDs
INSERT INTO amenity_categories (id, name) VALUES 
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Condomínio'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Comercial'), 
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Infraestrutura'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'Outros');

-- Insert default property amenities
INSERT INTO property_amenities (name, amenity_category_id) VALUES 
  ('Área de lazer', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'),
  ('Piscina', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'),
  ('Churrasqueira', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'),
  ('Garagem', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'),
  ('Varanda Gourmet', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13'),
  ('Gás encanado', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13'),
  ('Área de serviço', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13'),
  ('Próximo a praia', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14'),
  ('Próximo a parque', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14'),
  ('Próximo a hospital', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14'),
  ('Próximo a escola', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14'),
  ('Próximo a shopping', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14');
