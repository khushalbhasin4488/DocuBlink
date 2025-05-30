import { SizeBox } from "@/components/SizeBox"
import { ThemedText } from "@/components/ThemedText"
import { ThemedTextInput } from "@/components/ThemedTextInput"
import { ThemedView } from '@/components/ThemedView'
import { useThemeColor } from "@/hooks/useThemeColor"
import { useUserDataStore } from "@/store/userData"
import { Ionicons } from "@expo/vector-icons"
import React from 'react'
import { StyleSheet } from "react-native"
import SelectDropdown from 'react-native-select-dropdown'

export const DataDrawerPage = () => {

    const {
        WorkingProfessionaInfo,
        contact,
        email,
        name,
        adhar_number,
        pan_number,
        passport_number,
        voter_id,
        occupation,
        studentInfo,
        setContact,
        setEmail,
        setName,
        setAdharNumber,
        setPanNumber,
        setPassportNumber,
        setVoterId,
        setOccupation,
        setCompanyName,
        setJobTitle,
        setYearsOfExperience,
        setSkills,
        setCollegeName,
        setSection,
        setCourse,
        setGPA,
        setAchievementsSummary,
        setWorkingExperience,
        setGithubProfile,
        setLinkedinProfile,
        setTwitterProfile,
        setResumeLink
    } = useUserDataStore()
    const colors = useThemeColor()
    return (
        <ThemedView style={[styles.rootContainer, { backgroundColor: colors.backgrounds.main_background }]}>
            <ThemedText type="subtitle" style={[styles.Label, {
                color: colors.text_colors.tertiary_text,
                marginBottom: 6,
            }]}>
                Personal Information
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.Label}>
                Name
            </ThemedText>
            <ThemedTextInput value={name} setValue={setName}
                placeholder={"John Doe"} style={styles.formInput} />
            <ThemedText type="defaultSemiBold" style={styles.Label}>
                Email
            </ThemedText>
            <ThemedTextInput value={email} setValue={setEmail} placeholder="youremail@example.com" style={styles.formInput} />
            <ThemedText type="defaultSemiBold" style={styles.Label}>
                Contact
            </ThemedText>
            <ThemedTextInput value={contact} setValue={setContact} placeholder="1234567890" style={styles.formInput} />
            <ThemedText type="defaultSemiBold" style={styles.Label}>
                Aadhar Number
            </ThemedText>
            <ThemedTextInput value={adhar_number} setValue={setAdharNumber} placeholder="1234 5678 9012" style={styles.formInput} />    
            <ThemedText type="defaultSemiBold" style={styles.Label}>
                PAN Number
            </ThemedText>
            <ThemedTextInput value={pan_number} setValue={setPanNumber} placeholder="ABCDE1234F" style={styles.formInput} />
            <ThemedText type="defaultSemiBold" style={styles.Label}>
                Passport Number
            </ThemedText>
            <ThemedTextInput value={passport_number} setValue={setPassportNumber} placeholder="A123456789" style={styles.formInput} />      
            <ThemedText type="defaultSemiBold" style={styles.Label}>
                Voter ID
            </ThemedText>
            <ThemedTextInput value={voter_id} setValue={setVoterId} placeholder="XYZ1234567" style={styles.formInput} />
            <ThemedText type="defaultSemiBold" style={styles.Label}>
                Occupation
            </ThemedText>
            <SelectDropdown
                data={["STUDENT", "WORKING_PROFESSIONAL"]}
                onSelect={setOccupation}
                defaultValue={occupation}
                dropdownStyle={styles.dropdownMenuStyle}
                renderButton={(selectedItem, isOpened) => {
                    return (
                        <ThemedView style={[styles.dropdownButtonStyle, { backgroundColor: colors.backgrounds.card_surface, borderColor: colors.button_colors.primary }]}>
                            <ThemedText type="defaultSemiBold">
                                {selectedItem}
                            </ThemedText>
                            <Ionicons name={isOpened ? "chevron-up" : "chevron-down"} style={styles.dropdownButtonArrowStyle} color={colors.button_colors.primary} />
                        </ThemedView>
                    );
                }}
                renderItem={(item, index, isSelected) => {
                    return (
                        <ThemedView style={{ ...styles.dropdownItemStyle, backgroundColor: (isSelected ? colors.button_colors.primary : colors.backgrounds.main_background) }}>
                            <ThemedText type="defaultSemiBold" style={[styles.dropdownItemTxtStyle, (isSelected && { color: colors.button_colors.neutral_default })]}>{item}</ThemedText>

                        </ThemedView>
                    );
                }}
            />
            {(occupation == "WORKING_PROFESSIONAL") && (
                <>
                    <ThemedView>
                        <SizeBox size={8} />
                        <ThemedText type="subtitle" style={[styles.Label, {
                            color: colors.text_colors.tertiary_text, marginBottom: 6
                        }]}>
                            Professional Information
                        </ThemedText>
                        <ThemedText type="defaultSemiBold" style={styles.Label}>
                            Current Company
                        </ThemedText>
                        <ThemedTextInput value={WorkingProfessionaInfo.company_name} setValue={setCompanyName} placeholder="Google" style={styles.formInput} />
                        <ThemedText type="defaultSemiBold" style={styles.Label}>
                            Job Title
                        </ThemedText>
                        <ThemedTextInput value={WorkingProfessionaInfo.job_title} setValue={setJobTitle} placeholder="Job Title" style={styles.formInput} />
                        <ThemedText type="defaultSemiBold" style={styles.Label}>
                            Years of Experience
                        </ThemedText>
                        <ThemedTextInput value={WorkingProfessionaInfo.years_of_experience} setValue={setYearsOfExperience} placeholder="5" style={styles.formInput} />
                        <ThemedText type="defaultSemiBold" style={styles.Label}>
                            Skills
                        </ThemedText>
                        <ThemedTextInput
                        multiline
                         value={WorkingProfessionaInfo.skills} setValue={setSkills } placeholder="JavaScript, React, Node.js" style={[styles.formInput, {height:90}]} />
                         
                    </ThemedView>

                </>
            )}
            {(occupation == "STUDENT") && (
                <>
                    <ThemedView>
                        <SizeBox size={8} />
                        <ThemedText type="subtitle" style={[styles.Label, {
                            color: colors.text_colors.tertiary_text,
                            marginBottom: 6
                        }]}>
                            Student Information
                        </ThemedText>
                        <ThemedText type="defaultSemiBold" style={styles.Label}>
                            College Name
                        </ThemedText>
                        <ThemedTextInput value={studentInfo.college_name} setValue={setCollegeName} placeholder="Netaji Subhas University of Technology" style={styles.formInput} />
                        <ThemedText type="defaultSemiBold" style={styles.Label}>
                            Course
                        </ThemedText>
                        <ThemedTextInput value={studentInfo.course} setValue={setCourse} placeholder="Information Technology" style={styles.formInput} />
                        <ThemedText type="defaultSemiBold" style={styles.Label}>
                            Section
                        </ThemedText>
                        <ThemedTextInput value={studentInfo.section} setValue={setSection} placeholder="5" style={styles.formInput} />
                        <ThemedText type="defaultSemiBold" style={styles.Label}>
                            Skills
                        </ThemedText>
                        <ThemedTextInput
                        multiline
                         value={studentInfo.skills} setValue={setSkills } placeholder="JavaScript, React, Node.js" style={[styles.formInput, {height:90}]} />
                         
                    <ThemedText type="defaultSemiBold" style={styles.Label}>
                        GPA
                    </ThemedText>
                    <ThemedTextInput value={studentInfo.gpa} setValue={setGPA} placeholder="8.5" style={styles.formInput} />
                    <ThemedText type="defaultSemiBold" style={styles.Label}>
                        Working Experience
                    </ThemedText>
                    <ThemedTextInput
                        multiline
                        value={studentInfo.working_experience} setValue={setWorkingExperience} placeholder="Interned at XYZ Company" style={[styles.formInput, { height: 90 }]} />

                    </ThemedView>

                </>
            )}
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        width: "100%",
        padding: 20,
    },
    Label: {
        paddingLeft: 5,
        marginTop: 2
    },
    formInput: {
        padding: 0,
        marginVertical: 5,
        marginHorizontal: 0,
        height: 40

    },
    dropdownButtonStyle: {
        borderRadius: 12,
        padding: 5,
        paddingLeft: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        marginVertical: 5,
    },
    dropdownButtonTxtStyle: {

    },
    dropdownButtonArrowStyle: {
        fontSize: 24,
        paddingVertical: 3,
    },

    dropdownMenuStyle: {
        borderRadius: 8,

    },
    dropdownItemStyle: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
})