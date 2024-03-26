import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { addTodo } from "./CreateSlice";
import { useDispatch } from 'react-redux';

interface Todo {
    TaskName: string;
    Category: string;
    Date: string;
    Description: string;
    Start: string;
    End: string;
  }

const categories = ['Personal', 'Work', 'Study', 'Health', 'Finance', 'Other'];

const CreateTask = () => {
    const [taskName, setTaskName] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState<boolean>(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<Date>(new Date());
    const [endTime, setEndTime] = useState<Date>(new Date());
    const dispatch = useDispatch();

    const handleAddItem = () => {

        if (taskName && selectedCategory && date && description && startTime && endTime) {

            const startHours = startTime.getHours();
            const startMinutes = startTime.getMinutes();
            const endHours = endTime.getHours();
            const endMinutes = endTime.getMinutes();

            if (endHours < startHours || (endHours === startHours && endMinutes <= startMinutes)) {

                alert("End time should be after the Start time");

            } else {

                const serializedDate = date.toISOString().slice(0, 10);
                const startAMPM = startHours >= 12 ? 'PM' : 'AM';
                const formattedStartHours = startHours % 12 || 12;
                const serializedStartTime = `${formattedStartHours}:${startMinutes} ${startAMPM}`;
                const endAMPM = endHours >= 12 ? 'PM' : 'AM';
                const formattedEndHours = endHours % 12 || 12;
                const serializedEndTime = `${formattedEndHours}:${endMinutes} ${endAMPM}`;

                dispatch(addTodo({
                    TaskName: taskName,
                    Category: selectedCategory,
                    Date: serializedDate,
                    Description: description,
                    Start: serializedStartTime,
                    End: serializedEndTime
                  }));

                setTaskName("");
                setDescription("");
                setSelectedCategory("");
                setStartTime(new Date());
                setEndTime(new Date());
                setDate(new Date());
            }
        } else {
            alert("Kindly fill all fields");
        }
    };


    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
      };
    
      const onChange = (event:DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        
        setDate(currentDate);
      };
    
      const onChangeStartTime = (event: DateTimePickerEvent, selectedTime?: Date) => {
        const currentTime = selectedTime || startTime;
        setStartTime(currentTime);
        setShowStartTimePicker(false);
      };
    
      const onChangeEndTime = (event: DateTimePickerEvent, selectedTime?: Date) => {
        const currentTime = selectedTime || endTime;
        setEndTime(currentTime);
        setShowEndTimePicker(false);
      };
    
      const showDatepicker = () => {
        setShowDatePicker(true);
      };
    
      const showStartTimepicker = () => {
        setShowStartTimePicker(true);
      };
    
      const showEndTimepicker = () => {
        setShowEndTimePicker(true);
      };
    
      return (
        <ScrollView style={styles.container}>
          <Text style={styles.heading}>Task Name</Text>
          <TextInput
            style={styles.input}
            value={taskName}
            onChangeText={(text) => setTaskName(text)}
            placeholder="Example"
          />
    
          <Text style={styles.heading}>Category</Text>
          <View style={styles.categoriesContainer}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryBlock,
                  selectedCategory === category && styles.selectedCategoryBlock,
                ]}
                onPress={() => handleCategorySelect(category)}
              >
                <Text style={[
                  styles.categoryText1,
                  selectedCategory === category && styles.categoryText,
                ]}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
    
          <Text style={styles.heading}>Date & Time</Text>
          <TouchableOpacity
            onPress={showDatepicker}
            style={styles.date}>
            <View style={{ flexDirection: "row" }}>
              <Icon name="date-range" size={30} color="#900" style={styles.icon} />
              <Text style={styles.date1}>{date.toDateString()}</Text>
            </View>
          </TouchableOpacity>
    
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={showStartTimepicker}
              style={styles.time}>
              <View style={{ flexDirection: "row" }}>
                <Icon name="access-time" size={30} color="#900" style={styles.icon} />
                <Text style={styles.date1}> Start  {startTime.toLocaleTimeString()}</Text>
              </View>
            </TouchableOpacity>
    
            <TouchableOpacity
              onPress={showEndTimepicker}
              style={styles.time}>
              <View style={{ flexDirection: "row" }}>
                <Icon name="access-time" size={30} color="#900" style={styles.icon} />
                <Text style={styles.date1}> End  {endTime.toLocaleTimeString()}</Text>
              </View>
            </TouchableOpacity>
          </View>
    
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
              minimumDate={new Date()}
            />
          )}
    
          {showStartTimePicker && (
            <DateTimePicker
              testID="startTimePicker"
              value={startTime}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChangeStartTime}
    
            />
          )}
    
          {showEndTimePicker && (
            <DateTimePicker
              testID="endTimePicker"
              value={endTime}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChangeEndTime}
    
            />
            )}

            <Text style={styles.heading}>Description</Text>
            <TextInput
                style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                value={description}
                onChangeText={(text) => setDescription(text)}
                multiline
                placeholder="Enter task description"
            />

            <TouchableOpacity style={styles.button} onPress={() => { handleAddItem() }}>
                <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 40,
        backgroundColor: "white"

    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    categoryBlock: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        margin: 5,
    },
    selectedCategoryBlock: {
        backgroundColor: 'skyblue',
        color: "white"
    },
    categoryText: {
        fontSize: 16,
        color: "white"
    },
    categoryText1: {
        fontSize: 16,
    },
    button: {
        backgroundColor: 'skyblue',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 30
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    date: {
        borderWidth: 1,
        borderColor: "lightgrey",
        width: "100%",
        height: 50,
        borderRadius: 5,
        padding: 10,
    },
    icon: {
        height: 28,
        color: "grey",
        marginBottom: 7
    },
    date1: {
        marginLeft: 10,
        marginTop: 5
    },
    time: {
        borderWidth: 1,
        borderColor: "lightgrey",
        borderRadius: 3,
        height: 50,
        padding: 10,
        marginRight: 5,
        marginTop: 15
    }
});

export default CreateTask;
