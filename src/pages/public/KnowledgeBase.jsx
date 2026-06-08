import { useState } from 'react';
import { ChevronDown, Search, BookOpen } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import { KNOWLEDGE_BASE } from '../../data/mockData';

export default function KnowledgeBase() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const categories = Object.keys(KNOWLEDGE_BASE);

  const filteredArticles = selectedCategory
    ? KNOWLEDGE_BASE[selectedCategory].filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : Object.values(KNOWLEDGE_BASE).flat().filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div>
      <PageHeader 
        title="Knowledge Base" 
        subtitle="Find answers to common questions"
      />

      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles..."
            className="input-field pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="space-y-2">
          <h3 className="font-semibold mb-4">Categories</h3>
          <button
            onClick={() => setSelectedCategory(null)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === null
                ? 'bg-nexa-500 text-white'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            All Articles
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-nexa-500 text-white'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 space-y-3">
          {filteredArticles.length === 0 ? (
            <div className="card text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-slate-400" />
              <p className="text-slate-500">No articles found. Try a different search.</p>
            </div>
          ) : (
            filteredArticles.map((article) => (
              <div
                key={article.id}
                className="card cursor-pointer transition-all hover:shadow-md"
              >
                <button
                  onClick={() => setExpandedId(expandedId === article.id ? null : article.id)}
                  className="w-full flex items-start justify-between text-left"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold flex items-center gap-2">
                      <span className="text-lg">{article.icon}</span>
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {article.description}
                    </p>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 shrink-0 transition-transform ${
                      expandedId === article.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedId === article.id && (
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {article.content}
                      </p>
                    </div>
                    {article.steps && (
                      <ol className="list-decimal list-inside text-sm text-slate-700 dark:text-slate-300 mt-4 space-y-2">
                        {article.steps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    )}
                    {article.note && (
                      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-sm text-blue-800 dark:text-blue-300">
                        <strong>Note:</strong> {article.note}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
