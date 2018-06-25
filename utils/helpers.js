import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const STORAGE_KEY = 'secretsuperstar'
const NOTIFICATION_KEY = 'flashcards:notifications'

export const initData = () => {
    const decks = {
    React: {
      id: 1,
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      id: 2,
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
    return decks
}

function createNotification() {
    return {
        title: 'heya notif',
        body: "Please remember to use the app to check some cards",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
        Notifications.cancelAllScheduledNotificationsAsync
    )
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(data => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
                    console.log(`Status Grant: ${status}`)
                    if (status === 'granted') {
                        Notifications.cancelAllScheduledNotificationsAsync()

                        let tomorrow = new Date()
                        tomorrow.setDate(tomorrow.getDate() + 1)
                        tomorrow.setHours(20)
                        tomorrow.setMinutes(0)
                        Notifications.scheduleLocalNotificationAsync(createNotification(), {
                            time: tomorrow,
                            repeat: 'day'
                        })
                        initData()
                        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                    }
                })
            }
        })
}
