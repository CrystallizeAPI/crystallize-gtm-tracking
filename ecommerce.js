const {
  getCurrencyCode,
  getTrackingFieldsFromCrystallizeBasket,
  getValidationErrors,
  getProductTrackingFieldsFromCrystallizeProduct,
  getValidationErrorsInProducts,
  getValidationErrorsInProduct
} = require('./helpers');

function sendEcommerceEvent(data) {
  dataLayer.push({
    event: 'ecommerce',
    ecommerce: data
  });
}

function trackProductDetails({ product, actionField }) {
  const validProduct = getProductTrackingFieldsFromCrystallizeProduct(product);
  if (getValidationErrorsInProduct(validProduct)) {
    return;
  }

  sendEcommerceEvent({
    detail: {
      actionField,
      products: [product]
    }
  });
}

function trackAddProductToBasket({ product }) {
  trackAddProductsToBasket([product]);
}

function trackAddProductsToBasket({ products }) {
  const fields = getTrackingFieldsFromCrystallizeBasket({ items: products });

  if (getValidationErrorsInProducts(fields.products)) {
    return;
  }

  sendEcommerceEvent({
    currencyCode: getCurrencyCode(),
    add: {
      products: fields.products
    }
  });
}

function trackRemoveProductFromBasket({ product }) {
  trackRemoveProductsFromBasket([product]);
}

function trackRemoveProductsFromBasket({ products }) {
  const fields = getTrackingFieldsFromCrystallizeBasket({ items: products });

  if (getValidationErrorsInProducts(fields.products)) {
    return;
  }

  sendEcommerceEvent({
    currencyCode: getCurrencyCode(),
    remove: {
      products: fields.products
    }
  });
}

function trackCheckoutStep({ step, option, crystallizeBaskeModel }) {
  if (
    getValidationErrors(
      { step, crystallizeBaskeModel },
      'step crystallizeBaskeModel'
    )
  ) {
    return;
  }

  const { products } = getTrackingFieldsFromCrystallizeBasket(
    crystallizeBaskeModel
  );

  if (getValidationErrorsInProducts(products)) {
    return;
  }

  sendEcommerceEvent({
    currencyCode: getCurrencyCode(),
    checkout: {
      actionField: { step, option },
      products
    }
  });
}

function trackCheckoutOption({ step, option }) {
  if (getValidationErrors({ step, option }, 'step option')) {
    return;
  }

  sendEcommerceEvent({
    checkout_option: {
      actionField: { step, option }
    }
  });
}

function trackPurchase({ transactionId, crystallizeBaskeModel }) {
  if (
    getValidationErrors(
      { transactionId, crystallizeBaskeModel },
      'transactionId crystallizeBaskeModel'
    )
  ) {
    return;
  }

  const { products, shipping, coupon } = getTrackingFieldsFromCrystallizeBasket(
    crystallizeBaskeModel
  );

  if (getValidationErrorsInProducts(products)) {
    return;
  }

  // Get total transaction value
  const revenue = products.reduce((tot, p) => tot + p.price * p.quantity, 0);

  // Get total transaction tax
  const tax = products.reduce((tot, p) => tot + p.tax * p.quantity, 0);

  sendEcommerceEvent({
    currencyCode: getCurrencyCode(),
    purchase: {
      actionField: {
        id: transactionId,
        revenue,
        tax,
        shipping,
        coupon
      },
      products
    }
  });
}

module.exports = {
  setCurrencyCode: getCurrencyCode(),
  sendEcommerceEvent,
  trackProductDetails,
  trackAddProductToBasket,
  trackAddProductsToBasket,
  trackRemoveProductFromBasket,
  trackRemoveProductsFromBasket,
  trackCheckoutStep,
  trackPurchase,
  trackCheckoutOption,
  getTrackingFieldsFromCrystallizeBasket
};
