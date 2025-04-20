// AI Model Types
export interface LogoIdea {
  idea: string;
}

export interface LogoIdeasResponse {
  rawJson: LogoIdea[];
}

// Form Data Types
export interface Design {
  title: string;
  prompt: string;
  image: string;
}

export interface FormData {
  title: string;
  desc: string;
  palette?: string;
  design: Design;
  idea?: string;
}

export interface SharedFormProps<T = any> {
  formData: FormData;
  onHandleInputChange: (value: T) => void;
}

// Component Props Types using SharedFormProps
export type LogoTitleProps = SharedFormProps<string>;
export type LogoDescProps = SharedFormProps<string>;
export type LogoPaletteProps = SharedFormProps<string>;
export type LogoDesignsProps = SharedFormProps<Design>;
export type LogoIdeasProps = SharedFormProps<string>;
export type PricingModelProps = SharedFormProps<any>;
