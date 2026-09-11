import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import type { Order } from "../types";

import { dummyDashboardOrdersData } from "../assets/assets";

import Loading from "../components/Loading";

import { ArrowLeftIcon } from "lucide-react";

import OrderOTP from "../components/OrderTracking/OrderOTP";

import LiveMap from "../components/OrderTracking/LiveMap";

import OrderTimeLine from "../components/OrderTracking/OrderTimeLine";

const OrderTracking = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [order, setOrder] = useState<Order | null>(null);

  const [loading, setLoading] = useState(true);

  const [livelocation, setLiveLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    setOrder(dummyDashboardOrdersData.find((o) => o._id === id) as any);
    setLoading(false);
  }, [id, navigate]);

  if (loading) return <Loading />;

  if (!order) return null;

  return (
    <div className="min-h-screen mb-20 bg-app-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <button
          onClick={() => navigate("/orders")}
          className="flex items-center gap-2 text-sm text-app-text-light hover:text-app-green mb-6 transition-colors"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Orders
        </button>

        {/* Order id, date & status */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1>
              Order #{order._id.slice(-8).toUpperCase()}
            </h1>

            <p className="text-sm text-app-text-light mt-1">
              Placed on{" "}
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          <span
            className={`px-4 py-1.5 text-sm font-semibold rounded-full ${
              order.status === "Delivered"
                ? "bg-green-100 text-green-700"
                : order.status === "Canceled"
                ? "bg-red-100 text-red-700"
                : "bg-app-orange/10 text-app-orange"
            }`}
          >
            {order.status}
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Side Timeline + Map area */}
          <div className="lg:col-span-2 space-y-6">
            {/* OTP card */}
            <OrderOTP order={order} />

            {/* Live Tracking map */}
            <LiveMap order={order} liveLocation={livelocation} />

            {/* Progress Timeline */}
            <OrderTimeLine order={order} />

            {/* Delivery Person */}
            {order?.deliveryPartner &&
              order.status !== "Delivered" &&
              order.status !== "Cancelled" && (
                <div className="bg-white rounded-2xl p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-full bg-app-green flex-center">
                      <span className="text-white font-semibold text-sm">
                        {order.deliveryPartner.name.charAt(0)}
                      </span>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-app-green">
                        {order.deliveryPartner.name}
                      </p>

                      <p className="text-xs text-app-text-light capitalize">
                        {order.deliveryPartner.vehicleType} Delivery Partner
                      </p>
                    </div>
                  </div>
                </div>
              )}
          </div>

          {/* Right Side - Order Details */}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;