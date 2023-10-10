import { useState } from "react";
import { FactType } from "../types/FactType";
import { isValidHttpUrl } from "../App";
import supabase from "../supabase";
import { CATEGORIES } from "../categories";

type NewFactFormProps = {
    setFacts: React.Dispatch<React.SetStateAction<FactType[]>>
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}

export const NewFactForm = ({ setFacts, setShowForm }: NewFactFormProps) => {
    const [text, setText] = useState<string>('');
    // Fixed in a video text overlay
    const [source, setSource] = useState('');
    const [category, setCategory] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const textLength = text.length;
  
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

      e.preventDefault();
      console.log(text, source, category);
  

      if (text && isValidHttpUrl(source) && category && textLength <= 200) {

        setIsUploading(true);
        const { data: newFact, error } = await supabase
          .from('facts')
          .insert([{ text, source, category }])
          .select();
        setIsUploading(false);
  
        if (!error) setFacts((facts) => [newFact[0], ...facts]);
  
        setText('');
        setSource('');
        setCategory('');
  
        setShowForm(false);
      }
    }
  
    return (
      <form className='fact-form' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Share a fact with the world...'
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isUploading}
        />
        <span>{200 - textLength}</span>
        <input
          value={source}
          type='text'
          placeholder='Trustworthy source...'
          onChange={(e) => setSource(e.target.value)}
          disabled={isUploading}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={isUploading}
        >
          <option value=''>Choose category:</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name.toUpperCase()}
            </option>
          ))}
        </select>
        <button className='btn btn-large' disabled={isUploading}>
          Post
        </button>
      </form>
    );
  }