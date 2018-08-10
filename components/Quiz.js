import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PRIMARY_LIGHT, PRIMARY_DARK, ON_PRIMARY } from '../utils/colors';
import { NavigationActions } from 'react-navigation';
import { clearLocalNotification, setLocalNotification} from '../utils/helpers';

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;

    return {
      title: `${title} Quiz`
    };
  }
  state = {
    questions: [],
    ready: false,
    showResults: false,
    score: 0
  }
  componentDidMount() {
    const { questions } = this.props.navigation.state.params;

    this.setState(() => ({
      questions: questions.map((question) => ({ ...question, answered: false, correct: null, viewAnswer: false })),
      ready: true
    }));
  }
  toggleCard(index) {
    const { questions } = this.state;
    questions[index].viewAnswer = questions[index].viewAnswer ? false: true;
    this.setState(() => ({
      questions
    }));
  }
  answerCard(index, correct) {
    const { questions } = this.state;
    questions[index].correct = correct;
    questions[index].answered = true;
    const activeIndex = questions.findIndex((question) => { return question.answered === false; });

    this.setState(() => ({
      questions,
      showResults: activeIndex === -1 ? true: false,
      score: ((questions.filter((question) => (question.correct)).length/questions.length)*100).toFixed(2)
    }));

    if(activeIndex === -1) {
      clearLocalNotification().then(setLocalNotification);
    }
  }
  resetQuiz() {
    this.setState((state) => ({
      questions: state.questions.map((question) => {
        question.answered = false;
        question.correct = null;
        question.viewAnswer = false;
        return question;
      }),
      showResults: false,
      score: 0
    }));
  }
  render() {
    const { ready, questions, showResults, score } = this.state;
    const activeQuestion = questions.find((question) => { return question.answered === false; });
    const activeIndex = questions.findIndex((question) => { return question.answered === false; });

    return (
      <View style={styles.container}>
        {ready === true && (
          <View style={{ width: 400 }}>
            {questions.length === 0 && (
              <Text style={styles.header}>There are no questions yet in this quiz deck.</Text>
            )}
            {questions.length > 0 && (
              <View>
                {showResults && (
                  <View>
                    <Text style={styles.header}>You've completed the quiz with a score of {score}%!</Text>
                    <TouchableOpacity style={styles.buttonReset} onPress={() => this.resetQuiz()}>
                      <Text style={styles.buttonResetText}>Reset Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonBack} onPress={() => { this.props.navigation.dispatch(NavigationActions.back({ key: null })); }}>
                      <Text style={styles.buttonBackText}>Back to Deck</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {showResults === false && (
                  <View>
                    <Text style={styles.header}>{activeQuestion.viewAnswer ? activeQuestion.answer : activeQuestion.question}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => this.toggleCard(activeIndex)}>
                      <Text style={styles.buttonText}>{activeQuestion.viewAnswer ? 'View Question' : 'View Answer'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonCorrect} onPress={() => this.answerCard(activeIndex, true)}>
                      <Text style={styles.buttonCorrectText}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonIncorrect} onPress={() => this.answerCard(activeIndex, false)}>
                      <Text style={styles.buttonIncorrectText}>Incorrect</Text>
                    </TouchableOpacity>
                    <Text style={styles.questionCount}>{activeIndex+1} of {questions.length} cards.</Text>
                  </View>
                )}
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 36,
    textAlign: 'center'
  },
  questionCount: {
    color: PRIMARY_LIGHT,
    textAlign: 'center',
    fontSize: 24
  },
  button: {
    borderColor: PRIMARY_DARK,
    borderWidth: 1,
    margin: 5,
    borderRadius: 5,
    padding: 10
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: PRIMARY_DARK
  },
  buttonCorrect: {
    backgroundColor: 'green',
    margin: 5,
    borderRadius: 5,
    padding: 10
  },
  buttonCorrectText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FFF'
  },
  buttonIncorrect: {
    backgroundColor: 'red',
    margin: 5,
    borderRadius: 5,
    padding: 10
  },
  buttonIncorrectText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FFF'
  },
  buttonReset: {
    backgroundColor: PRIMARY_DARK,
    margin: 5,
    borderRadius: 5,
    padding: 10
  },
  buttonResetText: {
    fontSize: 18,
    textAlign: 'center',
    color: ON_PRIMARY
  },
  buttonBack: {
    margin: 5,
    borderRadius: 5,
    padding: 10
  },
  buttonBackText: {
    fontSize: 18,
    textAlign: 'center',
    color: PRIMARY_LIGHT
  },
});

export default Quiz;