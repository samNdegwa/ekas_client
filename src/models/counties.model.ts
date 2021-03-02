export interface countiesModelServer {
    id: number;
    name: string;
  }
  
  export interface ServerResponse {
    count: number;
    counties: countiesModelServer[];
  }
  