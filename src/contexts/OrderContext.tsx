import React, { createContext, useContext, useEffect, useState } from 'react';

type Member = {
  name: string;
  status: string;
  level: number;
  vocation: string;
};

type OrderContextType = {
  members: Member[];
  loading: boolean;
};

const OrderContext = createContext<OrderContextType>({ members: [], loading: true });

export const useOrder = () => useContext(OrderContext);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchOrder = () => {
      fetch('https://api.tibiadata.com/v4/guild/order')
        .then(r => r.json())
        .then(data => {
          if (!mounted) return;
          setMembers(data.guild.members || []);
          setLoading(false);
        })
        .catch(err => {
          console.error('OrderProvider fetch error', err);
          if (mounted) setLoading(false);
        });
    };

    fetchOrder();
    const id = setInterval(fetchOrder, 60000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  return (
    <OrderContext.Provider value={{ members, loading }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
