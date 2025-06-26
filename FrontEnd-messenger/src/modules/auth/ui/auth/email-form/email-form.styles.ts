import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../shared/constants";

export const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    margin: 20,
    justifyContent: "center",
    height: 421,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0f0f1a",
    textAlign: "center",
    marginBottom: 12
  },
  subtitle: {
    fontSize: 14,
    color: "#0f0f1a",
    textAlign: "center",
    marginBottom: 20
  },
  email: {
    fontWeight: "600"
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32
  },
  input: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d4d4d4",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",  
    backgroundColor: "#fff"
  },
  buttonBlock: {
    marginBottom: 20,
    marginTop: 17,
  },
  back: {
    alignItems: "center"
  },
  backText: {
    color: "#4b3a53",
    fontWeight: "500",
    fontSize: 16
  }
});
