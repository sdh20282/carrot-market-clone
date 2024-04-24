async function getProduct() {
  await new Promise(resolve => setTimeout(resolve, 5000));
}

export default async function ProductDetail({
  params: { id }
}: {
  params: { id: string }
}) {
  await getProduct();

  return (
    <span>Product Detail</span>
  )
}