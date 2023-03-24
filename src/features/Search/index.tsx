import TextInput, {TextInputProps} from 'components/TextInput';
import {ISearch} from 'icons';

type SearchProps = Omit<TextInputProps, 'icon'>;

const Search = (props: SearchProps) => {
  return <TextInput icon={<ISearch/>} {...props} />;
};

export default Search;
