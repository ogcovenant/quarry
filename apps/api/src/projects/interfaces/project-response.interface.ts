export interface ProjectResponse {
  id: number;
  uuid: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}
