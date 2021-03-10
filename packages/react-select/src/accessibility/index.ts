import {
  ActionMeta,
  GroupBase,
  OnChangeValue,
  OptionBase,
  Options,
  OptionsOrGroups,
} from '../types';

export type OptionContext = 'menu' | 'value';

export type GuidanceContext = 'menu' | 'input' | 'value';

export type AriaLive = 'polite' | 'off' | 'assertive';

export type AriaSelection<
  Option extends OptionBase,
  IsMulti extends boolean
> = ActionMeta<Option> & {
  value?: OnChangeValue<Option, IsMulti>;
};

export interface AriaGuidanceProps {
  /** String value of selectProp aria-label */
  'aria-label'?: string;
  /** String indicating user's current context and available keyboard interactivity */
  context: GuidanceContext;
  /** Boolean value of selectProp isSearchable */
  isSearchable?: boolean;
  /** Boolean value of selectProp isMulti */
  isMulti?: boolean;
  /** Boolean value of selectProp isDisabled */
  isDisabled?: boolean;
  /** Boolean value of selectProp tabSelectsValue */
  tabSelectsValue?: boolean;
}

export type AriaOnChangeProps<
  Option extends OptionBase,
  IsMulti extends boolean
> = AriaSelection<Option, IsMulti> & {
  /** String derived label from selected or removed option/value */
  label?: string;
  /** Boolean indicating if the selected menu option is disabled */
  isDisabled?: boolean;
};

export interface AriaOnFilterProps {
  /** String indicating current inputValue of the input */
  inputValue: string;
  /** String derived from selectProp screenReaderStatus */
  resultsMessage: string;
}

export interface AriaOnFocusProps<
  Option extends OptionBase,
  Group extends GroupBase<Option>
> {
  /** String indicating whether the option was focused in the menu or as (multi-) value */
  context: OptionContext;
  /** Option that is being focused */
  focused: Option | null;
  /** Boolean indicating whether focused menu option has been disabled */
  isDisabled?: boolean;
  /** Boolean indicating whether focused menu option is an already selected option */
  isSelected?: boolean;
  /** String derived label from focused option/value */
  label?: string;
  /** Options provided as props to Select used to determine indexing */
  options: OptionsOrGroups<Option, Group>;
  /** selected option(s) of the Select */
  selectValue?: Options<Option>;
}

export interface AriaLiveMessages<
  Option extends OptionBase,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> {
  /** Guidance message used to convey component state and specific keyboard interactivity */
  guidance?: (props: AriaGuidanceProps) => string;
  /** OnChange message used to convey changes to value but also called when user selects disabled option */
  onChange?: (props: AriaOnChangeProps<Option, IsMulti>) => string;
  /** OnFilter message used to convey information about filtered results displayed in the menu */
  onFilter?: (props: AriaOnFilterProps) => string;
  /** OnFocus message used to convey information about the currently focused option or value */
  onFocus?: (props: AriaOnFocusProps<Option, Group>) => string;
}

export const defaultAriaLiveMessages = {
  guidance: (props: AriaGuidanceProps) => {
    const {
      isSearchable,
      isMulti,
      isDisabled,
      tabSelectsValue,
      context,
    } = props;
    switch (context) {
      case 'menu':
        return `Use Up and Down to choose options${
          isDisabled
            ? ''
            : ', press Enter to select the currently focused option'
        }, press Escape to exit the menu${
          tabSelectsValue
            ? ', press Tab to select the option and exit the menu'
            : ''
        }.`;
      case 'input':
        return `${props['aria-label'] || 'Select'} is focused ${
          isSearchable ? ',type to refine list' : ''
        }, press Down to open the menu, ${
          isMulti ? ' press left to focus selected values' : ''
        }`;
      case 'value':
        return 'Use left and right to toggle between focused values, press Backspace to remove the currently focused value';
      default:
        return '';
    }
  },

  onChange: <Option extends OptionBase, IsMulti extends boolean>(
    props: AriaOnChangeProps<Option, IsMulti>
  ) => {
    const { action, label = '', isDisabled } = props;
    switch (action) {
      case 'deselect-option':
      case 'pop-value':
      case 'remove-value':
        return `option ${label}, deselected.`;
      case 'select-option':
        return isDisabled
          ? `option ${label} is disabled. Select another option.`
          : `option ${label}, selected.`;
      default:
        return '';
    }
  },

  onFocus: <Option extends OptionBase, Group extends GroupBase<Option>>(
    props: AriaOnFocusProps<Option, Group>
  ) => {
    const {
      context,
      focused = {},
      options,
      label = '',
      selectValue,
      isDisabled,
      isSelected,
    } = props;

    const getArrayIndex = (
      arr: OptionsOrGroups<Option, Group>,
      item: Option | null
    ) => (arr && arr.length ? `${arr.indexOf(item) + 1} of ${arr.length}` : '');

    if (context === 'value' && selectValue) {
      return `value ${label} focused, ${getArrayIndex(selectValue, focused)}.`;
    }

    if (context === 'menu') {
      const disabled = isDisabled ? ' disabled' : '';
      const status = `${isSelected ? 'selected' : 'focused'}${disabled}`;
      return `option ${label} ${status}, ${getArrayIndex(options, focused)}.`;
    }
    return '';
  },

  onFilter: (props: AriaOnFilterProps) => {
    const { inputValue, resultsMessage } = props;
    return `${resultsMessage}${
      inputValue ? ' for search term ' + inputValue : ''
    }.`;
  },
};