package com.tka.entity;

import java.util.Date;

import javax.persistence.*;

import com.tka.enums.ApplicationStatus;

@Entity
@Table(name = "job_applications")
public class JobApplication {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private Long studentId;
	
	private String studentName;

	private Long jobPostingId;
	
	private String companyName;
	
	@Temporal(TemporalType.TIMESTAMP)
    @Column(updatable = false)
    private Date appliedAt;

    @PrePersist
    protected void onCreate() {
        this.appliedAt = new Date();
        this.status = ApplicationStatus.APPLIED;
    }

    // getters & setters
    public Date getAppliedAt() {
        return appliedAt;
    }

    public void setAppliedAt(Date appliedAt) {
        this.appliedAt = appliedAt;
    }

	public String getStudentName() {
		return studentName;
	}

	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	@Enumerated(EnumType.STRING)
	private ApplicationStatus status; // Example: APPLIED, APPROVED, REJECTED

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

	public Long getJobPostingId() {
		return jobPostingId;
	}

	public void setJobPostingId(Long jobPostingId) {
		this.jobPostingId = jobPostingId;
	}

	public ApplicationStatus getStatus() {
		return status;
	}

	public void setStatus(ApplicationStatus status) {
		this.status = status;
	}

	
}


