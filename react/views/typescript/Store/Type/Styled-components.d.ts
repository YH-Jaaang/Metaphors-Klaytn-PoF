import 'react/views/typescript/Store/Type/Styled-components';
import { TypeMixin, TypeVariable } from '../../Styles/Theme';

declare module 'react/views/typescript/Store/Type/Styled-components' {
  export interface DefaultTheme {
    variable: TypeVariable;
    mixin: TypeMixin;
  }
}
