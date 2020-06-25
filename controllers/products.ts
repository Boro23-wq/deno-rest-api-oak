import { Product } from "../types.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

let products: Product[] = [
  {
    id: "1",
    name: "Airpods Pro",
    description: "Airpods for your iPhone, with engraved.",
    price: 249.00,
  },
  {
    id: "2",
    name: "Powerbeats Pro",
    description: "Totally wireless earphones - Moss",
    price: 249.95,
  },
  {
    id: "3",
    name: "Apple Magic Keyboard",
    description: "Compact Magic Keyboard for iPad Pro",
    price: 299.00,
  },
  {
    id: "4",
    name: "iPhone XS",
    description: "Refurbished iPhone XS 256 GB - Space Grey",
    price: 699.00,
  },
  {
    id: "5",
    name: "Macbook Pro 2020",
    description: "Next gen Mackbook Pro 13 inch 32GB 4TB",
    price: 1299.00,
  },
];

// @desc        Get all products
// @route       GET /api/v1/products
const getProducts = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
};

// @desc        Get single product
// @route       GET /api/v1/products/:id
const getProduct = (
  { params, response }: { params: { id: string }; response: any },
) => {
  const product: Product | undefined = products.find((p) => p.id === params.id);

  if (product) {
    response.status = 200;
    response.body = {
      success: true,
      data: product,
    };
  } else {
    response.status = 400;
    response.body = {
      success: false,
      msg: "Product Not Found!",
    };
  }
};

// @desc        Add a product
// @route       POST /api/v1/products
const addProduct = async (
  { request, response }: { request: any; response: any },
) => {
  //body : {type: {json}, value}
  const body = await request.body();

  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "No Data Found!",
    };
  } else {
    const product: Product = body.value;
    product.id = v4.generate();
    products.push(product);
    response.status = 201;
    response.body = {
      success: true,
      data: product,
    };
  }
};

// @desc        Update a product
// @route       PUT /api/v1/products/:id
const updateProduct = async (
  { request, params, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  const product: Product | undefined = products.find((p) => p.id === params.id);

  if (product) {
    const body = await request.body();

    const updatedData: { name?: string; description?: string; price?: number } =
      body.value;

    products = products.map((p) =>
      p.id === params.id ? { ...p, ...updatedData } : p
    );

    response.status = 200;
    response.body = {
      success: true,
      data: products,
    };
  } else {
    response.status = 400;
    response.body = {
      success: false,
      msg: "Product couldn't be updated!",
    };
  }
};

// @desc        Delete a product
// @route       PUT /api/v1/products/:id
const deleteProduct = (
  { params, response }: { params: { id: string }; response: any },
) => {
  products = products.filter((p) => p.id !== params.id);
  response.body = {
    success: true,
    msg: "Product Removed!",
  };
};

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
