import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="small">Priority Order</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ params }) {
  await updateOrder(params.orderId, { priority: true });
  return null;
}
