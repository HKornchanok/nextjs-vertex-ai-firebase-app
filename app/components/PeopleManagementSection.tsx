import React from 'react';

interface Person {
  name: string;
}

interface PeopleManagementSectionProps {
  people: Person[];
  newPersonName: string;
  duplicateError: string | null;
  onAddPerson: () => void;
  onRemovePerson: (index: number) => void;
  onNewPersonNameChange: (name: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const PeopleManagementSection: React.FC<PeopleManagementSectionProps> = ({
  people,
  newPersonName,
  duplicateError,
  onAddPerson,
  onRemovePerson,
  onNewPersonNameChange,
  onKeyDown,
}) => {
  return (
    <div className="card-section  h-full md:h-[29vh]">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Add People</h2>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          value={newPersonName}
          onChange={e => onNewPersonNameChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Enter person's name"
          className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
        />
        <button
          onClick={onAddPerson}
          className="w-full sm:w-auto bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Add
        </button>
      </div>
      {duplicateError && <div className="text-destructive mb-4 text-sm">{duplicateError}</div>}
      <div className="flex flex-wrap gap-2 overflow-y-auto p-2">
        {people.map((person, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-3 py-1.5 rounded-full text-sm"
          >
            <span className="font-medium truncate max-w-[150px]">{person.name}</span>
            <button
              onClick={() => onRemovePerson(index)}
              className="text-accent-foreground hover:text-accent-foreground/80 focus:outline-none flex-shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeopleManagementSection;
