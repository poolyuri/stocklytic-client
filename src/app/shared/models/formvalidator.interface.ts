export interface FormValidator {
    name: string;
    minLength: number;
    maxLength: number;
    type?: 'digits' | 'values';
}
