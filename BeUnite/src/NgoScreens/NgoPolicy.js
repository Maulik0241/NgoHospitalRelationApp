import React from 'react';
import {StyleSheet, ScrollView, Text} from 'react-native';

const NgoPolicy = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Privacy Policy</Text>
      <Text style={styles.content}>
        This Privacy Policy outlines how we collect, use, and protect your
        personal information when you use our NGO Hospital Relation App, which
        has been developed using React Native. By using our app, you agree to
        the terms of this Privacy Policy.
      </Text>
      <Text style={styles.header}>Information We Collect</Text>
      <Text style={styles.content}>
        We may collect personal information that you provide to us when you
        register and use our app, such as your name, email address, phone
        number, and organization. We may also collect information about your
        device, including your device type, operating system, and browser type.
      </Text>
      <Text style={styles.header}>How We Use Your Information</Text>
      <Text style={styles.content}>
        We may use your personal information to:
      </Text>
      <Text style={styles.listItem}>- Provide and improve our services</Text>
      <Text style={styles.listItem}>
        - Communicate with you about our services
      </Text>
      <Text style={styles.listItem}>
        - Send you updates and information about our app
      </Text>
      <Text style={styles.listItem}>
        - Respond to your inquiries and requests
      </Text>
      <Text style={styles.listItem}>- Analyze how our app is used</Text>
      <Text style={styles.listItem}>
        - Enforce our terms of service and other policies
      </Text>
      <Text style={styles.content}>
        We may also use non-personal information for research and analytics
        purposes.
      </Text>
      <Text style={styles.header}>How We Share Your Information</Text>
      <Text style={styles.content}>
        We may share your personal information with:
      </Text>
      <Text style={styles.listItem}>
        - Our service providers who assist us in providing and improving our
        services
      </Text>
      <Text style={styles.listItem}>
        - Other users of our app, but only with your consent
      </Text>
      <Text style={styles.listItem}>
        - Law enforcement or government agencies if we believe disclosure is
        necessary to comply with the law or protect our rights or the rights of
        others
      </Text>
      <Text style={styles.content}>
        We do not sell or rent your personal information to third parties.
      </Text>
      <Text style={styles.header}>How We Protect Your Information</Text>
      <Text style={styles.content}>
        We take appropriate measures to protect your personal information from
        unauthorized access, use, or disclosure. We use industry-standard
        security technologies and procedures to safeguard your information.
        However, no method of transmission over the internet or method of
        electronic storage is completely secure, and we cannot guarantee the
        absolute security of your information.
      </Text>
      <Text style={styles.header}>Your Choices</Text>
      <Text style={styles.content}>
        You can choose not to provide us with certain personal information, but
        this may limit your ability to use some of our app's features.
      </Text>
      <Text style={styles.content}>
        You may also opt-out of receiving certain communications from us by
        following the instructions provided in the communication.
      </Text>
      <Text style={styles.header}>Changes to this Privacy Policy</Text>
      <Text style={styles.content}>
        We may update this Privacy Policy from time to time. We will notify you
        of any material changes to this Privacy Policy by posting the new
        Privacy Policy on our website and in our app. Your continued use of our
        app after we make changes indicates your acceptance of the revised
        Privacy Policy.
      </Text>
      <Text style={styles.header}>Contact Us</Text>
      <Text style={styles.content}>
        If you have any questions about this Privacy Policy, please contact us
        at <Text style={{color:'#77A7FF'}} onPress={()=>navigation.navigate('NgoContactUs')}>contact information</Text>.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f2fcfe',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
    color:"black"
    
  },
  content: {
    fontSize: 18,
    marginBottom: 20,
    color: '#5A5A5A',
    lineHeight: 30,
    margin:10,
    textAlign:'justify'
  },
  listItem: {
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 10,
    color: '#5a5a5a',
    
    paddingLeft: 10,
    lineHeight: 20,
  },
});


export default NgoPolicy;
