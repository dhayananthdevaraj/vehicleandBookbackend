const { getProductById, addProduct, getAllProducts, getProductByUserId, deleteProduct, updateProduct } = require("../controllers/productController");
const { getUserByUsernameAndPassword, getAllUsers, addUser } = require("../controllers/userController");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const { validateToken } = require('../authUtils');




describe('getUserByUsernameAndPassword', () => {


  test('getuserbyusernameandpassword_should_return_invalid_credentials_with_a_200_status_code', async () => {
    // Sample user credentials
    const userCredentials = {
      email: 'nonexistent@example.com',
      password: 'incorrect_password',
    };

    // Mock Express request and response objects
    const req = {
      body: userCredentials,
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the User.findOne method to resolve with null (user not found)
    User.findOne = jest.fn().mockResolvedValue(null);

    // Call the controller function
    await getUserByUsernameAndPassword(req, res);

    // Assertions
    expect(User.findOne).toHaveBeenCalledWith(userCredentials);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid Credentials' });
  });

  test('getuserbyusernameandpassword_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
    // Mock an error to be thrown when calling User.findOne
    const error = new Error('Database error');

    // Sample user credentials
    const userCredentials = {
      email: 'john@example.com',
      password: 'password123',
    };

    // Mock Express request and response objects
    const req = {
      body: userCredentials,
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the User.findOne method to reject with an error
    User.findOne = jest.fn().mockRejectedValue(error);

    // Call the controller function
    await getUserByUsernameAndPassword(req, res);

    // Assertions
    expect(User.findOne).toHaveBeenCalledWith(userCredentials);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});

describe('addUser', () => {
  test('adduser_should_add_user_and_respond_with_a_200_status_code_and_success_message', async () => {
    // Sample user data
    const userData = {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123',
    };

    // Mock Express request and response objects
    const req = {
      body: userData,
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the User.create method to resolve with the sample user data
    User.create = jest.fn().mockResolvedValue(userData);

    // Call the controller function
    await addUser(req, res);

    // Assertions
    expect(User.create).toHaveBeenCalledWith(userData);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Success' });
  });

  test('adduser_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
    // Mock an error to be thrown when calling User.create
    const error = new Error('Database error');

    // Mock Express request and response objects
    const req = {
      body: {},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the User.create method to reject with an error
    User.create = jest.fn().mockRejectedValue(error);

    // Call the controller function
    await addUser(req, res);

    // Assertions
    expect(User.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});

describe('getAllUsers', () => {
  test('getallusers_should_return_users_and_respond_with_a_200_status_code', async () => {
    // Sample user data
    const usersData = [
      {
        _id: 'user1',
        username: 'john_doe',
        email: 'john@example.com',
        password: 'hashed_password1',
      },
      {
        _id: 'user2',
        username: 'jane_doe',
        email: 'jane@example.com',
        password: 'hashed_password2',
      },
    ];

    // Mock Express request and response objects
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the User.find method to resolve with the sample user data
    User.find = jest.fn().mockResolvedValue(usersData);

    // Call the controller function
    await getAllUsers(req, res);

    // Assertions
    expect(User.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(usersData);
  });

  test('getallusers_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
    // Mock an error to be thrown when calling User.find
    const error = new Error('Database error');

    // Mock Express request and response objects
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the User.find method to reject with an error
    User.find = jest.fn().mockRejectedValue(error);

    // Call the controller function
    await getAllUsers(req, res);

    // Assertions
    expect(User.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});
describe('getAllProducts', () => {
  test('getallproducts_should_return_with_a_200_status_code', async () => {
    // Sample product data
    const productsData = [
      {
        _id: 'product1',
        vehicleName:'Product 1',
        rentalPrice: 29.99,
        category: 'Clothing',
        description: 'Product 1 description',
        imageurl: 'https://example.com/product1-image.jpg',
        origin: 'Product 1 origin',
        quantity: 5,
        userId: 'user123',
      },
      {
        _id: 'product2',
        vehicleName:'Product 2',
        rentalPrice: 39.99,
        category: 'Electronics',
        description: 'Product 2 description',
        imageurl: 'https://example.com/product2-image.jpg',
        origin: 'Product 2 origin',
        quantity: 10,
        userId: 'user456',
      },
    ];

    // Mock Express request and response objects
    const req = {
      body: { sortValue: 1, searchValue: '' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Product.find method to resolve with the sample product data
    const productQuery = {
      sort: jest.fn().mockResolvedValue(productsData), // Mocking the sort function
      exec: jest.fn().mockResolvedValue(productsData), // Mocking the exec function
    };
    Product.find = jest.fn().mockReturnValue(productQuery);

    // Call the controller function
    await getAllProducts(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(200);
  });
  test('getallproducts_should_return_products_and_respond_with_a_200_status_code', async () => {
    // Sample product data
    const productsData = [
      {
        _id: 'product1',
        vehicleName:'Product 1',
        rentalPrice: 29.99,
        category: 'Clothing',
        description: 'Product 1 description',
        imageurl: 'https://example.com/product1-image.jpg',
        origin: 'Product 1 origin',
        quantity: 5,
        userId: 'user123',
      },
      {
        _id: 'product2',
        vehicleName:'Product 2',
        rentalPrice: 39.99,
        category: 'Electronics',
        description: 'Product 2 description',
        imageurl: 'https://example.com/product2-image.jpg',
        origin: 'Product 2 origin',
        quantity: 10,
        userId: 'user456',
      },
    ];

    // Mock Express request and response objects
    const req = {
      body: { sortValue: 1, searchValue: '' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Product.find method to resolve with the sample product data
    const productQuery = {
      sort: jest.fn().mockResolvedValue(productsData), // Mocking the sort function
      exec: jest.fn().mockResolvedValue(productsData), // Mocking the exec function
    };
    Product.find = jest.fn().mockReturnValue(productQuery);

    // Call the controller function
    await getAllProducts(req, res);

    // Assertions
    expect(Product.find).toHaveBeenCalledWith({ vehicleName:new RegExp('', 'i') });
    expect(productQuery.sort).toHaveBeenCalledWith({ rentalPrice: 1 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(productsData);
  });

  test('getallproducts_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
    // Mock an error to be thrown when calling Product.find
    const error = new Error('Database error');

    // Mock Express request and response objects
    const req = {
      body: { sortValue: 1, searchValue: '' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Product.find method to reject with an error
    const productQuery = {
      sort: jest.fn().mockRejectedValue(error), // Mocking the sort function with error
      exec: jest.fn().mockRejectedValue(error), // Mocking the exec function with error
    };
    Product.find = jest.fn().mockReturnValue(productQuery);

    // Call the controller function
    await getAllProducts(req, res);

    // Assertions
    expect(Product.find).toHaveBeenCalledWith({ vehicleName:new RegExp('', 'i') });
    expect(productQuery.sort).toHaveBeenCalledWith({ rentalPrice: 1 });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});
describe('getProductByUserId', () => {
  test('getproductbyuserid_should_return_products_for_a_valid_user_id_and_respond_with_a_200_status_code', async () => {
    // Sample user ID and product data
    const userId = 'user123';
    const productsData = [
      {
        _id: 'product1',
        vehicleName:'Product 1',
        rentalPrice: 29.99,
        category: 'Clothing',
        description: 'Product 1 description',
        imageurl: 'https://example.com/product1-image.jpg',
        origin: 'Product 1 origin',
        quantity: 5,
        userId: 'user123',
      },
      {
        _id: 'product2',
        vehicleName:'Product 2',
        rentalPrice: 39.99,
        category: 'Electronics',
        description: 'Product 2 description',
        imageurl: 'https://example.com/product2-image.jpg',
        origin: 'Product 2 origin',
        quantity: 10,
        userId: 'user123',
      },
    ];

    // Mock Express request and response objects
    const req = {
      body: { userId, sortValue: 1, searchValue: '' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Product.find method to resolve with a query
    const productQuery = {
      sort: jest.fn().mockResolvedValue(productsData), // Mocking the sort function
    };
    Product.find = jest.fn().mockReturnValue(productQuery);

    // Call the controller function
    await getProductByUserId(req, res);

    // Assertions
    expect(Product.find).toHaveBeenCalledWith({ userId: 'user123', vehicleName:new RegExp('', 'i') });
    expect(productQuery.sort).toHaveBeenCalledWith({ rentalPrice: 1 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(productsData);
  });

  test('getproductbyuserid_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
    // Mock an error to be thrown when calling Product.find
    const error = new Error('Database error');

    // Mock Express request and response objects
    const req = {
      body: { userId: 'user123', sortValue: 1, searchValue: '' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Product.find method to resolve with a query
    const productQuery = {
      sort: jest.fn().mockRejectedValue(error), // Mocking the sort function with error
    };
    Product.find = jest.fn().mockReturnValue(productQuery);

    // Call the controller function
    await getProductByUserId(req, res);

    // Assertions
    expect(Product.find).toHaveBeenCalledWith({ userId: 'user123', vehicleName:new RegExp('', 'i') });
    expect(productQuery.sort).toHaveBeenCalledWith({ rentalPrice: 1 });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});
describe('deleteProduct', () => {
  test('deleteproduct_should_delete_a_product_and_respond_with_a_200_status_code_and_success_message', async () => {
    // Sample product ID to be deleted
    const productId = 'product123';

    // Mock Express request and response objects
    const req = { params: { id: productId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Product.findByIdAndDelete method to resolve with the deleted product data
    Product.findByIdAndDelete = jest.fn().mockResolvedValue({
      _id: productId,
      vehicleName:'Deleted Product',
      // Include other fields as needed
    });

    // Call the controller function
    await deleteProduct(req, res);

    // Assertions
    expect(Product.findByIdAndDelete).toHaveBeenCalledWith(productId);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Vehicle deleted successfully' });
  });

  test('deleteproduct_should_handle_not_finding_a_product_and_respond_with_a_404_status_code', async () => {
    // Mock Express request and response objects
    const req = { params: { id: 'nonExistentProduct' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Product.findByIdAndDelete method to resolve with null (product not found)
    Product.findByIdAndDelete = jest.fn().mockResolvedValue(null);

    // Call the controller function
    await deleteProduct(req, res);

    // Assertions
    expect(Product.findByIdAndDelete).toHaveBeenCalledWith('nonExistentProduct');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Cannot find any vehicle' });
  });

  test('deleteproduct_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
    // Mock an error to be thrown when calling Product.findByIdAndDelete
    const error = new Error('Database error');

    // Mock Express request and response objects
    const req = { params: { id: 'product123' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Product.findByIdAndDelete method to reject with an error
    Product.findByIdAndDelete = jest.fn().mockRejectedValue(error);

    // Call the controller function
    await deleteProduct(req, res);

    // Assertions
    expect(Product.findByIdAndDelete).toHaveBeenCalledWith('product123');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});

describe('updateProduct', () => {
  test('updateproduct_should_update_a_product_and_respond_with_a_200_status_code_and_success_message', async () => {
    // Sample product ID and updated product data
    const productId = 'product123';
    const updatedProductData = {
      vehicleName:'Updated Product',
      rentalPrice: 39.99,
      category: 'Electronics',
      description: 'Updated product description',
      imageurl: 'https://example.com/updated-product-image.jpg',
      origin: 'Updated origin',
      quantity: 15,
      userId: 'user789',
    };

    // Mock Express request and response objects
    const req = { params: { id: productId }, body: updatedProductData };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Product.findByIdAndUpdate method to resolve with the updated product data
    Product.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedProductData);

    // Call the controller function
    await updateProduct(req, res);

    // Assertions
    expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(productId, updatedProductData, { new: true });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Vehicle updated successfully' });
  });

  test('updateproduct_should_handle_not_finding_a_product_and_respond_with_a_404_status_code', async () => {
    // Mock Express request and response objects
    const req = { params: { id: 'nonExistentProduct' }, body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Product.findByIdAndUpdate method to resolve with null (product not found)
    Product.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

    // Call the controller function
    await updateProduct(req, res);

    // Assertions
    expect(Product.findByIdAndUpdate).toHaveBeenCalledWith('nonExistentProduct', {}, { new: true });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Cannot find any vehicle' });
  });

  test('updateproduct_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
    // Mock an error to be thrown when calling Product.findByIdAndUpdate
    const error = new Error('Database error');

    // Mock Express request and response objects
    const req = { params: { id: 'product123' }, body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Product.findByIdAndUpdate method to reject with an error
    Product.findByIdAndUpdate = jest.fn().mockRejectedValue(error);

    // Call the controller function
    await updateProduct(req, res);

    // Assertions
    expect(Product.findByIdAndUpdate).toHaveBeenCalledWith('product123', {}, { new: true });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});
describe('getProductById', () => {
  test('getproductbyid_should_return_a_product_with_a_200_status_code', async () => {
    // Sample product ID and corresponding product
    const productId = 'product123';
    const productData = {
      _id: productId,
      vehicleName:'Sample Product',
      rentalPrice: 50.99,
      category: 'Electronics',
      description: 'Sample product description',
      imageurl: 'https://example.com/sample-image.jpg',
      origin: 'Sample origin',
      quantity: 10,
      userId: 'user123',
    };

    // Mock the Product.findById method to resolve with the sample product
    Product.findById = jest.fn().mockResolvedValue(productData);

    // Mock Express request and response objects
    const req = { params: { id: productId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the controller function
    await getProductById(req, res);

    // Assertions
    expect(Product.findById).toHaveBeenCalledWith(productId);
    expect(res.status).toHaveBeenCalledWith(200);
  });
  test('getproductbyid_should_return_a_product_with_a_exact_response_object', async () => {
    // Sample product ID and corresponding product
    const productId = 'product123';
    const productData = {
      _id: productId,
      vehicleName:'Sample Product',
      rentalPrice: 50.99,
      category: 'Electronics',
      description: 'Sample product description',
      imageurl: 'https://example.com/sample-image.jpg',
      origin: 'Sample origin',
      quantity: 10,
      userId: 'user123',
    };

    // Mock the Product.findById method to resolve with the sample product
    Product.findById = jest.fn().mockResolvedValue(productData);

    // Mock Express request and response objects
    const req = { params: { id: productId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the controller function
    await getProductById(req, res);

    // Assertions
    expect(Product.findById).toHaveBeenCalledWith(productId);
    expect(res.json).toHaveBeenCalledWith(productData);
  });
  test('getproductbyid_should_return_product_not_found_with_a_200_status_code', async () => {
    // Mock Express request and response objects
    const req = { params: { id: 'nonExistentProduct' } };

    // Mock the Product.findById method to resolve with null (product not found)
    Product.findById = jest.fn().mockResolvedValue(null);

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the controller function
    await getProductById(req, res);

    // Assertions
    expect(Product.findById).toHaveBeenCalledWith('nonExistentProduct');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Cannot find any vehicle' });
  });

  test('getproductbyid_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
    // Mock an error to be thrown when calling Product.findById
    const error = new Error('Database error');

    // Mock Express request and response objects
    const req = { params: { id: 'product123' } };

    // Mock the Product.findById method to reject with an error
    Product.findById = jest.fn().mockRejectedValue(error);

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the controller function
    await getProductById(req, res);

    // Assertions
    expect(Product.findById).toHaveBeenCalledWith('product123');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });

});
describe('addProduct', () => {
  test('addproduct_should_add_a_product_and_respond_with_a_200_status_code_and_success_message', async () => {
    // Sample product data to be added
    const productToAdd = {
      vehicleName:'New Product',
      rentalPrice: 29.99,
      category: 'Clothing',
      description: 'New product description',
      imageurl: 'https://example.com/new-product-image.jpg',
      origin: 'New origin',
      quantity: 5,
      userId: 'user456',
    };

    // Mock the Product.create method to resolve successfully
    Product.create = jest.fn().mockResolvedValue(productToAdd);

    // Mock Express request and response objects
    const req = { body: productToAdd };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the controller function
    await addProduct(req, res);

    // Assertions
    expect(Product.create).toHaveBeenCalledWith(productToAdd);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Vehicle added successfully' });
  });

  test('addproduct_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
    // Mock an error to be thrown when calling Product.create
    const error = new Error('Database error');

    // Mock the Product.create method to reject with an error
    Product.create = jest.fn().mockRejectedValue(error);

    // Mock Express request and response objects
    const req = { body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the controller function
    await addProduct(req, res);

    // Assertions
    expect(Product.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});
describe('User Model Schema Validation', () => {
  test('should_validate_a_user_with_valid_data', async () => {
    const validUserData = {
      firstName: 'John',
      lastName: 'Doe',
      mobileNumber: '1234567890',
      email: 'john.doe@example.com',
      role: 'user',
      password: 'validpassword',
    };

    const user = new User(validUserData);

    // Validate the user data against the schema
    await expect(user.validate()).resolves.toBeUndefined();
  });

  test('should_validate_a_user_with_missing_required_fields', async () => {
    const invalidUserData = {
      // Missing required fields
    };

    const user = new User(invalidUserData);

    // Validate the user data against the schema
    await expect(user.validate()).rejects.toThrowError();
  });

  test('should_validate_a_user_with_invalid_mobile_number_format', async () => {
    const invalidUserData = {
      firstName: 'John',
      lastName: 'Doe',
      mobileNumber: 'not-a-number',
      email: 'john.doe@example.com',
      role: 'user',
      password: 'validpassword',
    };

    const user = new User(invalidUserData);

    // Validate the user data against the schema
    await expect(user.validate()).rejects.toThrowError(/is not a valid mobile number/);
  });

  test('should_validate_a_user_with_invalid_email_format', async () => {
    const invalidUserData = {
      firstName: 'John',
      lastName: 'Doe',
      mobileNumber: '1234567890',
      email: 'invalid-email',
      role: 'user',
      password: 'validpassword',
    };

    const user = new User(invalidUserData);

    // Validate the user data against the schema
    await expect(user.validate()).rejects.toThrowError(/is not a valid email address/);
  });

  test('should_validate_a_user_with_a_password_shorter_than_the_minimum_length', async () => {
    const invalidUserData = {
      firstName: 'John',
      lastName: 'Doe',
      mobileNumber: '1234567890',
      email: 'john.doe@example.com',
      role: 'user',
      password: 'short',
    };

    const user = new User(invalidUserData);

    // Validate the user data against the schema
    await expect(user.validate()).rejects.toThrowError(/is shorter than the minimum allowed length/);
  });

  test('should_validate_a_user_with_a password_longer_than_the_maximum_length', async () => {
    const invalidUserData = {
      firstName: 'John',
      lastName: 'Doe',
      mobileNumber: '1234567890',
      email: 'john.doe@example.com',
      role: 'user',
      password: 'a'.repeat(256),
    };

    const user = new User(invalidUserData);

    // Validate the user data against the schema
    await expect(user.validate()).rejects.toThrowError(/is longer than the maximum allowed length /);
  });
});
describe("schema validation for product",()=>{
  test('should_validate_a_product_with_a_negative_price', async () => {
    const invalidProductData = {
      vehicleName:'Sample Product',
      rentalPrice: -10,
      description: 'This is a sample product description.',
      imageurl: 'https://example.com/sample-image.jpg',
      category: 'Electronics',
      origin: 'Sample Origin',
      quantity: 10,
      userId: 'user123',
    };
  
    const product = new Product(invalidProductData);
  
    // Validate the product data against the schema
    await expect(product.validate()).rejects.toThrowError(/is less than minimum allowed value/);
  });
  test('should_validate_a_product_with_a_negative_quantity', async () => {
    const invalidProductData = {
      vehicleName:'Sample Product',
      rentalPrice: 50.99,
      description: 'This is a sample product description.',
      imageurl: 'https://example.com/sample-image.jpg',
      category: 'Electronics',
      origin: 'Sample Origin',
      quantity: -5, // Quantity less than zero
      userId: 'user123',
    };

    const product = new Product(invalidProductData);

    // Validate the product data against the schema
    await expect(product.validate()).rejects.toThrowError(/is less than minimum allowed value/);
  });
  test('should_validate_a_product_with_a_description_longer_than_the_maximum_length', async () => {
    const invalidProductData = {
      vehicleName:'Sample Product',
      rentalPrice: 50.99,
      description: 'This is a sample product description. '.repeat(20), // Create a description longer than the maximum length
      imageurl: 'https://example.com/sample-image.jpg',
      category: 'Electronics',
      origin: 'Sample Origin',
      quantity: 10,
      userId: 'user123',
    };

    const product = new Product(invalidProductData);

    // Validate the product data against the schema
    await expect(product.validate()).rejects.toThrowError(/is longer than the maximum allowed length/);
  });
})

describe('validateToken', () => {
 
  test('should_respond_with_400_status_and_error_message_if_invalid_token_is_provided', () => {
    // Mock the req, res, and next objects
    const req = {
      header: jest.fn().mockReturnValue('invalidToken'),
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    // Call the validateToken function
    validateToken(req, res, next);

    // Assertions
    expect(req.header).toHaveBeenCalledWith('Authorization');
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Authentication failed' });
  });

  test('should_respond_with_400_status_and_error_message_if_no_token_is_provided', () => {
    // Mock the req, res, and next objects
    const req = {
      header: jest.fn().mockReturnValue(null),
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    // Call the validateToken function
    validateToken(req, res, next);

    // Assertions
    expect(req.header).toHaveBeenCalledWith('Authorization');
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Authentication failed' });
  });
});

