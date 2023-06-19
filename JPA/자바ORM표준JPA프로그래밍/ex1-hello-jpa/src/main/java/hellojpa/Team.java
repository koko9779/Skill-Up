package hellojpa;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Team {
    @Id @GeneratedValue
    @Column(name = "TEAM_ID")
    private Long id;
    private String name;
    /**
     * mappedBy
     * 양방향 매핑 규칙
     * -객체의 두 관계 중 하나를 연관관계의 주인으로 지정 (외래키가 있는 곳을 주인으로 정해라)
     * -연관관계의 주인만이 외래키를 관리(등록/수정)
     * -주인이 아닌쪽은 읽기만 가능
     */
    @OneToMany(mappedBy = "team")   //연관관계
    private List<Member> members = new ArrayList<>();

    public Team() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Member> getMembers() {
        return members;
    }

    public void setMembers(List<Member> members) {
        this.members = members;
    }
}
