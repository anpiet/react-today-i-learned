import { useState } from "react";
import { FactType } from "../types/FactType";
import { CATEGORIES } from "../categories";
import supabase from "../supabase";


type FactProps = {
    fact: FactType,
    setFacts: React.Dispatch<React.SetStateAction<FactType[]>>
}

export const Fact = ({ fact, setFacts }: FactProps) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const isDisputed =
      fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;
  
    async function handleVote(columnName: 'votesInteresting' | 'votesMindblowing' | 'votesFalse') {
      setIsUpdating(true);
      const { data: updatedFact, error } = await supabase
        .from('facts')
        .update({ [columnName]: fact[columnName] + 1 })
        .eq('id', fact.id)
        .select();
      setIsUpdating(false);
  
      if (!error)
        setFacts((facts) =>
          facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
        );
    }

    return (
        <li className='fact'>
          <p>
            {isDisputed ? <span className='disputed'>[⛔️ DISPUTED]</span> : null}
            {fact.text}
            <a className='source' href={fact.source} target='_blank' rel="noreferrer">
              (Source)
            </a>
          </p>
          <span
            className='tag'
            style={{
              backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category) ? CATEGORIES.find((cat) => cat.name === fact.category)?.color : '#3b82f6'
            }}
          >
            {fact.category}
          </span>
          <div className='vote-buttons'>
            <button
              onClick={() => handleVote('votesInteresting')}
              disabled={isUpdating}
            >
              👍 {fact.votesInteresting}
            </button>
            <button
              onClick={() => handleVote('votesMindblowing')}
              disabled={isUpdating}
            >
              🤯 {fact.votesMindblowing}
            </button>
            <button onClick={() => handleVote('votesFalse')} disabled={isUpdating}>
              ⛔️ {fact.votesFalse}
            </button>
          </div>
        </li>
      );
    }
    