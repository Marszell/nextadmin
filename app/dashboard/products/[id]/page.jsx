import AddOrUpdateProductPage from "@/app/dashboard/products/AddOrUpdateProductPage";

const UpdateProductPage = ({ params }) => {
    const id = params.id;

    return <AddOrUpdateProductPage
        isCreate={false}
        id={id}
    />
}

export default UpdateProductPage