import React from 'react';

const AddToCart = () => {
  return (
    <form method="post">
      <input name="store" value="YOUR-SHOP-ID" type="hidden" />
      <input name="need_to_ship" value="no" type="hidden" />
      <input name="need_to_tax" value="no" type="hidden" />
      <input name="quantity" value="1" type="hidden" />
      <input name="identifier" value="Online Payment" type="hidden" />
      <input name="description" value="Sample product description" type="hidden" />
      <input name="price" value="5.00" type="hidden" />
      <input name="submit" value="Add To Cart" type="submit" />
    </form>
  );
};

export default AddToCart;
