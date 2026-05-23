import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Member = {
  name: string;
  status: string;
  level: number;
  vocation: string;
};

type GuildData = {
  members: Member[];
  loading: boolean;
};

type OrderContextType = {
  guilds: Record<string, GuildData>;
  members: Member[]; // for backward compatibility
  loading: boolean; // for backward compatibility
};

const OrderContext = createContext<OrderContextType>({ 
  guilds: {}, 
  members: [], 
  loading: true 
});

export const useOrder = () => useContext(OrderContext);

export const useGuild = (guildName: string) => {
  const context = useContext(OrderContext);
  return context.guilds[guildName] || { members: [], loading: true };
};

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [guilds, setGuilds] = useState<Record<string, GuildData>>({
    'order': { members: [], loading: true },
    'jantei-dominat': { members: [], loading: true }
  });

  const updateGuildData = (guildName: string, members: Member[], loading: boolean) => {
    setGuilds(prev => ({
      ...prev,
      [guildName]: { members, loading }
    }));
  };

  const handleFetchSuccess = (guildName: string, data: any) => {
    updateGuildData(guildName, data.guild.members || [], false);
  };

  const handleFetchError = (guildName: string) => {
    setGuilds(prev => ({
      ...prev,
      [guildName]: {
        ...prev[guildName],
        loading: false
      }
    }));
  };

  useEffect(() => {
    let mounted = true;

    const fetchGuild = (guildName: string) => {
      const apiGuildName = guildName === 'jantei-dominat' ? 'jantei%20dominat' : 'order';
      fetch(`https://api.tibiadata.com/v4/guild/${apiGuildName}`)
        .then(r => r.json())
        .then(data => {
          if (mounted) {
            handleFetchSuccess(guildName, data);
          }
        })
        .catch(err => {
          console.error(`OrderProvider fetch error for ${guildName}:`, err);
          if (mounted) {
            handleFetchError(guildName);
          }
        });
    };

    // Fetch both guilds on mount
    fetchGuild('order');
    fetchGuild('jantei-dominat');

    // Set up interval to refetch both guilds
    const id = setInterval(() => {
      fetchGuild('order');
      fetchGuild('jantei-dominat');
    }, 60000);

    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  // Use useMemo to prevent context value from changing on every render
  const contextValue = useMemo(() => ({
    guilds,
    members: guilds['order']?.members || [],
    loading: guilds['order']?.loading || true
  }), [guilds]);

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
