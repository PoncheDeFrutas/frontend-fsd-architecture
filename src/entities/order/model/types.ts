export type OrderStatus = "processing" | "shipped";

export type Order = {
    id: string;
    item: string;
    status: OrderStatus;
};
