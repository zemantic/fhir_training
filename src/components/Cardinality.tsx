import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle} from 'lucide-react';

const CardinalityPage = () => {
  const [currentExample, setCurrentExample] = useState(0);
  const [showFeedback, setShowFeedback] = useState<Record<number, boolean>>({});

  const cardinalityExamples = [
    {
      title: "Patient Resource - Name",
      cardinality: "1..*",
      description: "A patient must have at least one name, but can have multiple names",
      validExamples: [
        { names: ["John Doe"], valid: true },
        { names: ["John Doe", "Johnny D"], valid: true },
        { names: ["Dr. Jane Smith", "Jane Smith-Johnson", "J. Smith"], valid: true }
      ],
      invalidExamples: [
        { names: [], valid: false, reason: "No names provided (violates minimum of 1)" }
      ]
    },
    {
      title: "Patient Resource - Birth Date",
      cardinality: "0..1",
      description: "A patient can have zero or one birth date (optional, but not multiple)",
      validExamples: [
        { birthDates: [], valid: true },
        { birthDates: ["1985-03-15"], valid: true }
      ],
      invalidExamples: [
        { birthDates: ["1985-03-15", "1985-03-16"], valid: false, reason: "Multiple birth dates (violates maximum of 1)" }
      ]
    },
    {
      title: "Patient Resource - Identifier",
      cardinality: "0..*",
      description: "A patient can have zero or more identifiers (completely optional)",
      validExamples: [
        { identifiers: [], valid: true },
        { identifiers: ["SSN: 123-45-6789"], valid: true },
        { identifiers: ["SSN: 123-45-6789", "MRN: 98765", "Driver's License: DL123456"], valid: true }
      ],
      invalidExamples: []
    },
    {
      title: "Patient Resource - Gender",
      cardinality: "1..1",
      description: "A patient must have exactly one gender value",
      validExamples: [
        { genders: ["male"], valid: true },
        { genders: ["female"], valid: true },
        { genders: ["other"], valid: true }
      ],
      invalidExamples: [
        { genders: [], valid: false, reason: "No gender provided (violates requirement of exactly 1)" },
        { genders: ["male", "female"], valid: false, reason: "Multiple genders (violates maximum of 1)" }
      ]
    }
  ];

  const quizQuestions = [
    {
      question: "What does the cardinality '1..*' mean?",
      options: [
        "Exactly one element required",
        "Zero or one element allowed",
        "At least one element required, unlimited maximum",
        "Zero or more elements allowed"
      ],
      correct: 2,
      explanation: "'1..*' means minimum 1, maximum unlimited - at least one element is required, but you can have as many as needed."
    },
    {
      question: "Which cardinality allows completely optional elements?",
      options: [
        "1..1",
        "1..*",
        "0..1",
        "0..*"
      ],
      correct: 3,
      explanation: "'0..*' allows zero or more elements, making it completely optional with no upper limit."
    },
    {
      question: "If a FHIR element has cardinality '0..1', how many values can it have?",
      options: [
        "Exactly zero",
        "Exactly one",
        "Zero or one",
        "One or more"
      ],
      correct: 2,
      explanation: "'0..1' means the element is optional (0) but if present, can only have one value (maximum 1)."
    }
  ];

  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});

  const CardinalityBadge = ({ cardinality }: { cardinality: string }) => {
    const getColor = (card: any) => {
      switch(card) {
        case '0..1': return 'bg-blue-100 text-blue-800';
        case '1..1': return 'bg-red-100 text-red-800';
        case '0..*': return 'bg-green-100 text-green-800';
        case '1..*': return 'bg-purple-100 text-purple-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getColor(cardinality)}`}>
        {cardinality}
      </span>
    );
  };

  const ExampleCard = ({ example, isValid }: { example: any; isValid: boolean }) => {
    const getIcon = () => {
      if (isValid) return <CheckCircle className="w-5 h-5 text-green-600" />;
      return <XCircle className="w-5 h-5 text-red-600" />;
    };

    const getFieldName = (example: { names: any; birthDates: any; identifiers: any; genders: any; }) => {
      if (example.names) return 'Names';
      if (example.birthDates) return 'Birth Dates';
      if (example.identifiers) return 'Identifiers';
      if (example.genders) return 'Genders';
      return 'Values';
    };

    const getFieldValues = (example: { names: any; birthDates: any; identifiers: any; genders: any; }) => {
      return example.names || example.birthDates || example.identifiers || example.genders || [];
    };

    return (
      <div className={`p-4 rounded-lg border-2 ${isValid ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
        <div className="flex items-center gap-2 mb-2">
          {getIcon()}
          <span className={`font-medium ${isValid ? 'text-green-800' : 'text-red-800'}`}>
            {isValid ? 'Valid' : 'Invalid'}
          </span>
        </div>
        <div className="text-sm">
          <strong>{getFieldName(example)}:</strong>
          {getFieldValues(example).length === 0 ? (
            <span className="text-gray-500 italic"> (none)</span>
          ) : (
            <ul className="mt-1">
              {getFieldValues(example).map((value: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, idx: React.Key | null | undefined) => (
                <li key={idx} className="ml-4">• {value}</li>
              ))}
            </ul>
          )}
        </div>
        {!isValid && example.reason && (
          <div className="mt-2 text-xs text-red-600">
            <AlertCircle className="w-4 h-4 inline mr-1" />
            {example.reason}
          </div>
        )}
      </div>
    );
  };

  const handleQuizAnswer = (questionIdx: number, answerIdx: number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionIdx]: answerIdx
    }));
    setShowFeedback(prev => ({
      ...prev,
      [questionIdx]: true
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">FHIR Cardinality Interactive Learning</h1>
        <p className="text-gray-600">Learn how FHIR cardinality constraints work with interactive examples</p>
      </div>

      {/* Cardinality Reference */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Cardinality Reference</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <CardinalityBadge cardinality="1..1" />
            <span>Required, exactly one</span>
          </div>
          <div className="flex items-center gap-3">
            <CardinalityBadge cardinality="0..1" />
            <span>Optional, maximum one</span>
          </div>
          <div className="flex items-center gap-3">
            <CardinalityBadge cardinality="1..*" />
            <span>Required, one or more</span>
          </div>
          <div className="flex items-center gap-3">
            <CardinalityBadge cardinality="0..*" />
            <span>Optional, zero or more</span>
          </div>
        </div>
      </div>

      {/* Interactive Examples */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Interactive Examples</h2>

        <div className="flex gap-2 mb-6 overflow-x-auto">
          {cardinalityExamples.map((example, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentExample(idx)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                currentExample === idx
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {example.title}
            </button>
          ))}
        </div>

        <div className="bg-white border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-xl font-semibold">{cardinalityExamples[currentExample].title}</h3>
            <CardinalityBadge cardinality={cardinalityExamples[currentExample].cardinality} />
          </div>

          <p className="text-gray-600 mb-6">{cardinalityExamples[currentExample].description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Valid Examples
              </h4>
              <div className="space-y-3">
                {cardinalityExamples[currentExample].validExamples.map((example, idx) => (
                  <ExampleCard key={idx} example={example} isValid={true} />
                ))}
              </div>
            </div>

            {cardinalityExamples[currentExample].invalidExamples.length > 0 && (
              <div>
                <h4 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Invalid Examples
                </h4>
                <div className="space-y-3">
                  {cardinalityExamples[currentExample].invalidExamples.map((example, idx) => (
                    <ExampleCard key={idx} example={example} isValid={false} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quiz Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Knowledge Check</h2>

        <div className="flex gap-2 mb-6">
          {quizQuestions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentQuiz(idx)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentQuiz === idx
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Question {idx + 1}
            </button>
          ))}
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            {quizQuestions[currentQuiz].question}
          </h3>

          <div className="space-y-3">
            {quizQuestions[currentQuiz].options.map((option, idx) => {
              const isSelected = quizAnswers[currentQuiz] === idx;
              const isCorrect = idx === quizQuestions[currentQuiz].correct;
              const showResult = showFeedback[currentQuiz];

              return (
                <button
                  key={idx}
                  onClick={() => handleQuizAnswer(currentQuiz, idx)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                    showResult
                      ? isCorrect
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : isSelected
                        ? 'border-red-500 bg-red-50 text-red-800'
                        : 'border-gray-200 bg-gray-50'
                      : isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {showResult && isCorrect && <CheckCircle className="w-5 h-5 text-green-600" />}
                    {showResult && !isCorrect && isSelected && <XCircle className="w-5 h-5 text-red-600" />}
                    <span>{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {showFeedback[currentQuiz] && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-blue-800 font-medium">Explanation:</p>
                  <p className="text-blue-700">{quizQuestions[currentQuiz].explanation}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-3">Key Takeaways</h2>
        <ul className="space-y-2 text-gray-700">
          <li>• <strong>1..1</strong> means exactly one value is required</li>
          <li>• <strong>0..1</strong> means the element is optional but can have at most one value</li>
          <li>• <strong>1..*</strong> means at least one value is required, but unlimited additional values are allowed</li>
          <li>• <strong>0..*</strong> means the element is completely optional with no upper limit</li>
          <li>• FHIR cardinality ensures data consistency and interoperability across healthcare systems</li>
        </ul>
      </div>
    </div>
  );
};

export default CardinalityPage;