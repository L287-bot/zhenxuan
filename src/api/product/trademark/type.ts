//基本返回数据类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}
//已有品牌ts数据类型
export interface TradeMark {
  id?: number;
  tmName: string;
  logoUrl: string;
}
//所有品牌ts数据类型
export type Records = TradeMark[];

//获取数据接口返回的整体数据类型
export interface TradeMarkResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
  };
}
