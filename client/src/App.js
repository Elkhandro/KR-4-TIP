
import React, { useState, useEffect } from 'react';

import './App.css';

function MoodDiary() {

  const [currentMood, setCurrentMood] = useState('');

  const emotions = [
    { name: 'happy', emoji: '😊' },
    { name: 'sad', emoji: '😢' },
    { name: 'angry', emoji: '😠' },
    { name: 'tired', emoji: '😴' },
    { name: 'excited', emoji: '🤩' },
  ];


  useEffect(() => {
    const savedMood = localStorage.getItem('currentMood');
    if (savedMood) {
      setCurrentMood(savedMood);
    }
  }, []); 
  const handleMoodClick = (moodName) => {
    // Обновляем состояние текущего настроения
    setCurrentMood(moodName);
    // Сохраняем выбранное настроение в localStorage браузера
    // Это позволит не терять данные при перезагрузке страницы
    localStorage.setItem('currentMood', moodName);
  };

  
  const handleResetClick = () => {
    setCurrentMood(''); 
    localStorage.removeItem('currentMood'); 
  };

  
  const currentEmotion = emotions.find(emotion => emotion.name === currentMood);

  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Мой мини-дневник настроения</h1>
        <p>Выбери свое настроение на сегодня:</p>

        {/* Блок с кнопками для выбора эмоций */}
        <div className="mood-buttons">
          {/* Проходим по массиву emotions и для каждой создаем кнопку */}
          {emotions.map((emotion) => (
            <button
              key={emotion.name} // Важно: каждый элемент в списке должен иметь уникальный key
              className={`mood-button ${currentMood === emotion.name ? 'selected' : ''}`}
              // При клике на кнопку вызываем handleMoodClick и передаем название эмоции
              onClick={() => handleMoodClick(emotion.name)}
            >
              {emotion.emoji} {/* Отображаем emoji на кнопке */}
            </button>
          ))}
        </div>

        {/* Блок для отображения результата */}
        <div className="result">
          {/* Если текущее настроение выбрано (currentMood не пустая строка), показываем сообщение */}
          {currentMood && (
            <>
              <h2>Твое настроение на сегодня:</h2>
              <p className="selected-mood">
                {currentEmotion?.emoji} {/* Отображаем emoji выбранной эмоции */}
              </p>
              <button onClick={handleResetClick} className="reset-button">
                Сбросить
              </button>
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default MoodDiary;