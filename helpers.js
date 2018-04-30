let currencyCode = 'NOK';

function setCurrencyCode(newCode) {
  currencyCode = newCode;
}

function getCurrencyCode(newCode) {
  return currencyCode;
}

function getValidationErrors(object, argsString) {
  return argsString.split(' ').reduce((acc, key) => {
    if (typeof object[key] === 'undefined') {
      /* eslint-disable */
      console.error(
        `@crystallize/tracking: Missing required argument "${key}"`
      );
      /* eslint-enable */
      return acc + 1;
    }
    return acc;
  }, 0);
}

function getValidationErrorsInProduct(product) {
  return getValidationErrors(product, 'id name price tax quantity');
}

function getValidationErrorsInProducts(products = []) {
  if (products.length === 0) {
    /* eslint-disable */
    console.error(`@crystallize/tracking: Missing required products`);
    /* eslint-enable */
    return 1;
  }

  function validate(acc, product) {
    return acc + getValidationErrorsInProduct(product);
  }

  return products.reduce(validate, 0);
}

function getTrackingFieldsFromCrystallizeBasket(crystallizeBasket) {
  function getProducts() {
    return crystallizeBasket.items.map(
      getProductTrackingFieldsFromCrystallizeProduct
    );
  }

  function getShipping() {
    return crystallizeBasket.shipping
      ? crystallizeBasket.shipping.price
      : undefined;
  }

  function getCoupon() {
    return crystallizeBasket.coupon || undefined;
  }

  return {
    products: getProducts(),
    shipping: getShipping(),
    coupon: getCoupon()
  };
}

function getProductTrackingFieldsFromCrystallizeProduct(product) {
  return {
    id: product.sku,
    name: product.name,
    price: product.price || product.unit_price || product.price_from,
    tax: product.tax || 0,
    quantity: product.quantity || 1
  };
}

module.exports = {
  setCurrencyCode,
  getCurrencyCode,
  getValidationErrors,
  getValidationErrorsInProduct,
  getValidationErrorsInProducts,
  getTrackingFieldsFromCrystallizeBasket,
  getProductTrackingFieldsFromCrystallizeProduct
};
