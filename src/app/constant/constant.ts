export const TITLE = {
  HEADER: 'Santander Corporate & Investment Banking (FX)',
  SUBHEADER: 'FX Price Ticker',
  PRICE: {
    ALL: "The Feed will Produce All Prices",
    LATEST: "The Feed will Produce Latest Prices",
    NO: "No Feed? Please Check Server!"
  },
  PARA: `We would like to connect to a FX price feed of spot prices from the market. We want to display a
  ticking stream of prices to a user.
  The definition of a Price consists of unique id, instrument name, bid, ask and timestamp. You can
  assume that the Bid means the sell price (which is lower) and the Ask is the buy price (which is
  higher).
  Use Javascript or other UI frameworks of your choice to write a responsive REST client and simple
webpage that connects to the service and shows all the latest available prices, but to also keep them
updated. Some instruments will update faster than others.`,
  DATEFORMAT: 'MM:DD:YYYY',
  TIMEFORMAT: 'HH:mm:ss',
  BUTTONS: [
    {
    name: "All Price",
    color: "primary"
  },
  {
    name: "Latest Price",
    color: "success"
  }
]
}
