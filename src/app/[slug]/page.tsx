interface TokenData {
    mint: string;
    name: string;
    symbol: string;
    description: string;
    image_uri: string;
    metadata_uri: string;
    twitter: string;
    telegram: string;
    bonding_curve: string;
    associated_bonding_curve: string;
    creator: string;
    created_timestamp: number;
    raydium_pool?: null;
    complete: boolean;
    virtual_sol_reserves: number;
    virtual_token_reserves: number;
    total_supply: number;
    website: string;
    show_name: boolean;
    king_of_the_hill_timestamp?: null;
    market_cap: number;
    reply_count: number;
    last_reply: number;
    nsfw: boolean;
    market_id?: null;
    inverted?: null;
    username: string;
    profile_image: string;
    usd_market_cap: number;
  }
  
  async function getData(slug: string): Promise<TokenData> {
    const res = await fetch(
      `https://frontend-api.pump.fun/coins/${slug}`,
    );
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }
    return res.json();
  }
  
  export default async function TokenPage({params}: {params: {slug: string}}): Promise<JSX.Element> {
    try {
      const token = await getData(params.slug);
      if (!token) {
        return (
          <div className="relative flex max-w-7xl flex-col place-items-center justify-center">
            Token not found
          </div>
        );
      }
  
      return (
        <div className="relative flex flex-col items-center justify-center max-w-7xl mx-auto pt-10">
          <div className="grid grid-cols-8">
            <div className=" col-span-6">CHART HERE</div>
            <div className=" col-span-2">
          
          <img src={token.image_uri} alt={token.name} className="w-80" />
          <h1 className="mt-5 text-xl font-semibold">{token.name} ({token.symbol})</h1>
          <p className="mt-4">{token.description}</p>
          <a href={token.website} target="_blank" rel="noopener noreferrer">Visit Website</a>
          {/* Outros campos podem ser adicionados conforme necessário */}</div>
  
          </div>
          
        </div>
      );
    } catch (error: any) {
      return <div>Error: {error.message}</div>; // Adequado para exibir mensagens de erro
    }
  }
  