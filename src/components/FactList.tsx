import { FactType } from "../types/FactType";
import { Fact } from '../components/Fact'

type FactListProps = {
    facts: FactType[],
    setFacts: React.Dispatch<React.SetStateAction<FactType[]>>
}

export const FactList = ({ facts, setFacts }: FactListProps) => {
    if (facts.length === 0)
      return (
        <p className='message'>
          No facts for this category yet! Create the first one ✌️
        </p>
      );
  
    return (
      <section>
        <ul className='facts-list'>
          {facts.map((fact) => (
            <Fact key={fact.id} fact={fact} setFacts={setFacts} />
          ))}
        </ul>
        <p>There are {facts.length} facts in the database. Add your own!</p>
      </section>
    );
  }