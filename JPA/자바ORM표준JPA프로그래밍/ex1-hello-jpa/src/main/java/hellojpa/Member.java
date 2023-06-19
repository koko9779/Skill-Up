package hellojpa;

import javax.persistence.*;
import java.util.Date;

@Entity
/**
테이블 전략 매핑
@TableGenerator(
        name = "MEMBER_SEQ_GENERATOR",
        table = "MY_SEQUENCES",                             //MY_SEQUENCES 테이블에서 시퀀스를 따온다
        pkColumnValue = "MEMBER_SEQ", allocationSize = 1    //시퀀스명 : MEMBER_SEQ
)
*/
/**
시퀀스 전략 매핑
@SequenceGenerator(
        name = "MEMBER_SEQ_GENERATOR",
        sequenceName = "MEMBER_SEQ",                        //매핑할 데이터베이스 시퀀스 이름
        initialValue = 1, allocationSize = 50)
*/
public class Member {
    @Id     //기본키매핑 직접할당
    /*
    @GeneratedValue(
                    //strategy = GenerationType.TABLE,        //테이블 전략 매핑
                    strategy = GenerationType.SEQUENCE,       //시퀀스 전략 매핑
                    generator = "MEMBER_SEQ_GENERATOR")     //매핑할 데이터베이스 시퀀스 이름
     */
    @GeneratedValue
    @Column(name = "MEMBER_ID")
    private Long id;
    @Column(name = "USERNAME")
    private String name;

    @ManyToOne
    @JoinColumn(name = "TEAM_ID")
    private Team team;

    //@Column(name = "TEAM_ID")
    //private Long teamId;
    
    /*
    @Enumerated(EnumType.STRING)        //Enumerated : ENUM타입 (EnumType.ORDINAL : enum 순서를 저장, EnumType.STRING: enum 이름을 저장)
    private RoleType roleType;

    @Temporal(TemporalType.TIMESTAMP)   //Temporal : 날짜타입
    private Date createdDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date lastModifiedDate;

    @Lob                                //Lob : varchar를 넘어서는 큰 컨텐츠
    private String description;

    @Transient                          //Transient : DB랑 매핑을 안하고 싶은 컬럼 (메모리에서만 임시로 사용)
    private int temp;
     */

    // JPA는 기본생성자를 꼭 써줘야 한다.
    public Member(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return name;
    }

    public void setUsername(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    /*
    public Long getTeamId() {
        return teamId;
    }

    public void setTeamId(Long teamId) {
        this.teamId = teamId;
    }
    */

    public void changeTeam(Team team) {
        this.team = team;
        team.getMembers().add(this);    //양방향 연관관계시 양쪽 값을 설정하자
    }

    public Team getTeam() {
        return team;
    }
}
