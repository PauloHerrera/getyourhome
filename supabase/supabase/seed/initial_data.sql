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
  ('Outros', 'Outros')
ON CONFLICT (name) DO NOTHING;

-- Insert default roles
INSERT INTO roles (name) VALUES 
  ('admin'),
  ('broker'),
  ('lead')
ON CONFLICT (name) DO NOTHING;

-- Insert default users
INSERT INTO users (id, email, password, first_name, last_name, role_id) VALUES 
  ('admin', 'admin@example.com', 'admin', 'Admin', 'User', 1),
  ('broker', 'broker@example.com', 'broker', 'Broker', 'User', 2),
  ('lead', 'lead@example.com', 'lead', 'Lead', 'User', 3)
ON CONFLICT (id) DO NOTHING;