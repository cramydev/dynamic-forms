export interface CreateForm {
  name: string,
  description: string,
  status: string,
  inputs: InputData[],  
}

export interface InputData {
  typeId: number,
  type: string,
  required: boolean,
  nameType: string,
  label: string,
  maxLength: number,
  minLength: number,
  options: string[]
}

export type ButtonType = 'primary' | 'secondary' | 'link' | 'cancel'