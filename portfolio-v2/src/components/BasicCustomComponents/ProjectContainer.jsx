import styles from "./ProjectContainer.module.css";

function ProjectContainer({ children }) {
  return <div className={styles.app}>{children}</div>;
}

export default ProjectContainer;
