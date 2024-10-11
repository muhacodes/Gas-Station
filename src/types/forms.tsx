type Option = {
    value: string;
    label: string;
  };
  
//   type FormField = {
//     name: string;
//     label: string;
//     type: 'text' | 'date' | 'select' | 'autocomplete' | 'number' | 'checkbox';
//     options?: Option[]; // For select fields
//     required?: boolean;
//     autocompleteOptions?: Option[]; // For autocomplete fields
//   };
  
//   type FormField = {
//     name: keyof T;
//     label: string;
//     type: 'text' | 'date' | 'select' | 'autocomplete' | 'number' | 'checkbox';
//     options?: Option[];
//     required?: boolean;
//     autocompleteOptions?: Option[];
//   };