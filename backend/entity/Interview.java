package com.tka.entity;

import java.util.Date;
import javax.persistence.*;

@Entity
@Table(name = "interviews")
public class Interview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;
    private Long jobApplicationId;
    private String companyName;

    // ✅ FIX 1: interviewDate as String (NO timezone)
    private String interviewDate;

    private String interviewStatus; // SCHEDULED, COMPLETED, CANCELLED

    // ✅ FIX 2: appliedAt as Date (timestamp)
    @Temporal(TemporalType.TIMESTAMP)
    @Column(updatable = false)
    private Date appliedAt;

    // ✅ Auto-set timestamp correctly
    @PrePersist
    protected void onCreate() {
        this.appliedAt = new Date();
    }

    // ===== Getters & Setters =====

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getJobApplicationId() {
        return jobApplicationId;
    }

    public void setJobApplicationId(Long jobApplicationId) {
        this.jobApplicationId = jobApplicationId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getInterviewDate() {
        return interviewDate;
    }

    public void setInterviewDate(String interviewDate) {
        this.interviewDate = interviewDate;
    }

    public String getInterviewStatus() {
        return interviewStatus;
    }

    public void setInterviewStatus(String interviewStatus) {
        this.interviewStatus = interviewStatus;
    }

    public Date getAppliedAt() {
        return appliedAt;
    }

    public void setAppliedAt(Date appliedAt) {
        this.appliedAt = appliedAt;
    }
}
