import { useState } from 'react';
import { FAQ_ITEMS } from '../data/faq';

function AccordionItem({ id, question, answer, isOpen, onToggle }) {
  const panelId = `${id}-panel`;

  return (
    <div className="faq__item">
      <h3 className="faq__question-wrapper">
        <button
          className="faq__question"
          id={id}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span>{question}</span>
          <span className="faq__icon" aria-hidden="true">
            {isOpen ? '−' : '+'}
          </span>
        </button>
      </h3>
      <div
        className={`faq__panel ${isOpen ? 'faq__panel--open' : ''}`}
        id={panelId}
        role="region"
        aria-labelledby={id}
      >
        <p className="faq__answer">{answer}</p>
      </div>
    </div>
  );
}

function FAQ() {
  const [openId, setOpenId] = useState(null);

  return (
    <section className="faq" id="faq" aria-labelledby="faq-title">
      <div className="container">
        <div className="section-header">
          <span className="section-header__badge">常見問題</span>
          <h2 id="faq-title" className="section-header__title">
            有疑問？我們為您解答
          </h2>
          <p className="section-header__desc">
            以下是關於 SalesPilot CRM 最常被詢問的問題。若仍需協助，歡迎隨時聯繫我們。
          </p>
        </div>
        <div className="faq__list">
          {FAQ_ITEMS.map((item) => (
            <AccordionItem
              key={item.id}
              {...item}
              isOpen={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
