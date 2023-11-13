const productController = require('../controllers/ProductController');
const Product = require('../models/Product');

jest.mock('../models/Product', () => ({
  findAll: jest.fn(),
}));

describe('productController', () => {
  it('should get all products', async () => {
    // Arrange
    const mockProducts = [{ id: 1, name: 'Product 1' }];
    Product.findAll.mockResolvedValue(mockProducts);

    // Act
    const res = {
      setHeader: jest.fn(),
      json: jest.fn(),
      status: jest.fn(),
    };

    await productController.getAllProducts({}, res);

    // Assert
    expect(Product.findAll).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ catalog: mockProducts });
  });

  it('should handle errors when fetching products', async () => {
    // Arrange
    const error = new Error('Database error');
    Product.findAll.mockRejectedValue(error);

    // Act
    const res = {
      setHeader: jest.fn(),
      json: jest.fn(),
      status: jest.fn(),
    };

    await productController.getAllProducts({}, res);

    // Assert
    expect(Product.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});
