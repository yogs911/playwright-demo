import { test, expect } from '../../src/fixtures';
import { ProductFactory } from '../../src/data/factories';

test.describe('ReqRes Products Collection API', () => {

  test.describe('GET /collections/products/records', () => {
    test('should return list of products', async ({ productAPI }) => {
      const response = await productAPI.getProducts();

      expect(response.data).toBeInstanceOf(Array);
      expect(response.meta.total).toBeGreaterThanOrEqual(0);
      expect(response.meta.page).toBe(1);
    });
  });

  test.describe('POST /collections/products/records', () => {
    test('should create a product and return it', async ({ productAPI }) => {
      const payload = ProductFactory.create();
      const response = await productAPI.createProduct(payload);

      expect(response.id).toBeTruthy();
      expect(response.data.name).toBe(payload.name);
      expect(response.data.price).toBe(payload.price);
      expect(response.data.category).toBe(payload.category);
      expect(response.data.in_stock).toBe(payload.in_stock);
    });

    test('should create product with fixed name', async ({ productAPI }) => {
      const payload = ProductFactory.create({ name: 'Test Product' });
      const response = await productAPI.createProduct(payload);

      expect(response.data.name).toBe('Test Product');
    });
  });

  test.describe('PUT /collections/products/records/:id', () => {
    test('should fully update a product', async ({ productAPI }) => {
      // create first
      const created = await productAPI.createProduct(ProductFactory.create());
      const updatePayload = ProductFactory.create({ name: 'Updated Product' });

      const updated = await productAPI.updateProduct(created.id!, updatePayload);

      expect(updated.data.name).toBe('Updated Product');
    });
  });

  test.describe('DELETE /collections/products/records/:id', () => {
    test('should delete a product and return 200', async ({ productAPI }) => {
      const created = await productAPI.createProduct(ProductFactory.create());
      const statusCode = await productAPI.deleteProduct(created.id!);

      expect(statusCode).toBe(204);

      const statusAfterDelete = await productAPI.getProductStatus(created.id);
      expect(statusAfterDelete).toBe(404);
    });
  });
});